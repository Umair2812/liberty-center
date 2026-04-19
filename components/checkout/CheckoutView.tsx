"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import type { CartLine } from "@/context/CartContext";
import { isAddonCartLine, useCart } from "@/context/CartContext";
import type { AddonInputKind } from "@/data/productAddons";
import { formatRs } from "@/lib/format";
import {
  CITIES_BY_PROVINCE,
  DEFAULT_COUNTRY,
  PROVINCES,
} from "@/components/checkout/pkLocations";

const FBR_POS_PKR = 1;
const SHIPPING_PKR = 0;

/** Stronger than `border-line` so fields read clearly on white */
const FORM_BORDER =
  "border border-foreground/25 hover:border-foreground/35 transition-[border-color,box-shadow]";
const FORM_FOCUS =
  "outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/25";
const FORM_FOCUS_WITHIN =
  "focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/25";
const FORM_ERROR =
  "border-red-600 hover:border-red-600 focus-visible:border-red-600 focus-visible:ring-2 focus-visible:ring-red-500/20";

const SHIPPING_FIELD_ORDER = [
  "ship-fn",
  "ship-ln",
  "ship-a1",
  "ship-country",
  "ship-province",
  "ship-city",
  "ship-postal",
  "ship-phone",
] as const;

const BILLING_FIELD_ORDER = [
  "bill-fn",
  "bill-ln",
  "bill-a1",
  "bill-country",
  "bill-province",
  "bill-city",
  "bill-postal",
  "bill-phone",
] as const;

type CheckoutAddress = {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  phoneLocal: string;
};

const ADDRESS_IDS_SHIPPING = {
  fn: "ship-fn",
  ln: "ship-ln",
  a1: "ship-a1",
  country: "ship-country",
  province: "ship-province",
  city: "ship-city",
  postal: "ship-postal",
  phone: "ship-phone",
} as const;

const ADDRESS_IDS_BILLING = {
  fn: "bill-fn",
  ln: "bill-ln",
  a1: "bill-a1",
  country: "bill-country",
  province: "bill-province",
  city: "bill-city",
  postal: "bill-postal",
  phone: "bill-phone",
} as const;

function validateContactEmail(email: string): string | undefined {
  const t = email.trim();
  if (!t) return "Email is required.";
  if (t.length > 254) return "Email is too long.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) {
    return "Enter a valid email address.";
  }
  return undefined;
}

/** Pakistani mobile without country code: 03XXXXXXXXX (11) or 3XXXXXXXXX (10). */
function validatePkMobileLocal(local: string): string | undefined {
  let d = local.replace(/\D/g, "");
  if (!d) return "Phone number is required.";
  if (d.startsWith("92") && d.length >= 12) d = d.slice(2);
  if (d.length === 11 && d.startsWith("0")) {
    return /^03\d{9}$/.test(d)
      ? undefined
      : "Use a valid mobile like 03XX XXXXXXX.";
  }
  if (d.length === 10 && /^3\d{9}$/.test(d)) return undefined;
  return "Enter 10–11 digits for a Pakistani mobile (e.g. 03XX XXXXXXX).";
}

function validatePostalPkOptional(code: string): string | undefined {
  const t = code.trim();
  if (!t) return undefined;
  if (t.length < 4) return "Postal code looks too short.";
  if (t.length > 12) return "Postal code is too long.";
  if (!/^[a-zA-Z0-9\s\-]+$/.test(t)) {
    return "Use letters, numbers, spaces, or hyphens only.";
  }
  return undefined;
}

function validateAddressFields(
  s: CheckoutAddress,
  ids: typeof ADDRESS_IDS_SHIPPING | typeof ADDRESS_IDS_BILLING,
): Partial<Record<string, string>> {
  const e: Partial<Record<string, string>> = {};

  const fn = s.firstName.trim();
  if (fn.length < 2) {
    e[ids.fn] = "Enter at least 2 characters.";
  } else if (!/^[\p{L}\s\-'.]+$/u.test(fn)) {
    e[ids.fn] = "Use letters only.";
  }

  const ln = s.lastName.trim();
  if (ln.length < 2) {
    e[ids.ln] = "Enter at least 2 characters.";
  } else if (!/^[\p{L}\s\-'.]+$/u.test(ln)) {
    e[ids.ln] = "Use letters only.";
  }

  const a1 = s.address1.trim();
  if (a1.length < 5) {
    e[ids.a1] = "Enter your full street address (at least 5 characters).";
  }

  if (!s.country.trim()) {
    e[ids.country] = "Select a country.";
  }

  if (s.country === DEFAULT_COUNTRY && !s.province) {
    e[ids.province] = "Select your province.";
  }

  if (!s.city.trim()) {
    e[ids.city] = "Select your city.";
  }

  const postalErr = validatePostalPkOptional(s.postalCode);
  if (postalErr) e[ids.postal] = postalErr;

  const phoneErr = validatePkMobileLocal(s.phoneLocal);
  if (phoneErr) e[ids.phone] = phoneErr;

  return e;
}

function validateShippingFields(
  s: CheckoutAddress,
): Partial<Record<(typeof SHIPPING_FIELD_ORDER)[number], string>> {
  return validateAddressFields(s, ADDRESS_IDS_SHIPPING) as Partial<
    Record<(typeof SHIPPING_FIELD_ORDER)[number], string>
  >;
}

function validateBillingFields(
  s: CheckoutAddress,
): Partial<Record<(typeof BILLING_FIELD_ORDER)[number], string>> {
  return validateAddressFields(s, ADDRESS_IDS_BILLING) as Partial<
    Record<(typeof BILLING_FIELD_ORDER)[number], string>
  >;
}

const PAYMENT_CARD_IDS = [
  "pay-card",
  "pay-mm",
  "pay-yy",
  "pay-cvv",
  "pay-name",
] as const;

function luhnCheck(panDigits: string): boolean {
  const d = panDigits.replace(/\D/g, "");
  if (d.length < 13 || d.length > 19) return false;
  let sum = 0;
  let double = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = parseInt(d[i], 10);
    if (double) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    double = !double;
  }
  return sum % 10 === 0;
}

function cardExpiryValid(month: string, yearFull: string): boolean {
  const m = parseInt(month, 10);
  const y = parseInt(yearFull, 10);
  if (!Number.isFinite(m) || m < 1 || m > 12) return false;
  if (!Number.isFinite(y) || y < 2000) return false;
  const now = new Date();
  const cy = now.getFullYear();
  const cm = now.getMonth() + 1;
  if (y > cy) return true;
  if (y < cy) return false;
  return m >= cm;
}

function formatCardPanGroups(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 19);
  return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

type PaymentCardFieldId = (typeof PAYMENT_CARD_IDS)[number];

function validateCardPayment(fields: {
  pan: string;
  month: string;
  year: string;
  cvv: string;
  name: string;
}): Partial<Record<PaymentCardFieldId, string>> {
  const e: Partial<Record<PaymentCardFieldId, string>> = {};
  const pan = fields.pan.replace(/\D/g, "");
  if (pan.length < 13) {
    e["pay-card"] = "Enter a complete card number.";
  } else if (!luhnCheck(pan)) {
    e["pay-card"] = "Card number does not look valid.";
  }

  if (!fields.month) {
    e["pay-mm"] = "Select month.";
  }

  if (!fields.year) {
    e["pay-yy"] = "Select year.";
  } else if (
    fields.month &&
    fields.year &&
    !cardExpiryValid(fields.month, fields.year)
  ) {
    e["pay-yy"] = "Card appears expired.";
  }

  const cvv = fields.cvv.replace(/\D/g, "");
  if (cvv.length < 3 || cvv.length > 4) {
    e["pay-cvv"] = "Enter 3 or 4 digit security code.";
  }

  const name = fields.name.trim();
  if (name.length < 2) {
    e["pay-name"] = "Enter the name on card.";
  } else if (!/^[\p{L}\s\-'.]+$/u.test(name)) {
    e["pay-name"] = "Use letters only.";
  }

  return e;
}

function scrollToFirstPaymentError(
  errors: Partial<Record<PaymentCardFieldId, string>>,
) {
  for (const id of PAYMENT_CARD_IDS) {
    if (errors[id]) {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
  }
}

function scrollToFirstBillingFieldError(
  errors: Partial<Record<(typeof BILLING_FIELD_ORDER)[number], string>>,
) {
  for (const id of BILLING_FIELD_ORDER) {
    if (errors[id]) {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
  }
}

function scrollToFirstFieldError(
  errors: Partial<Record<(typeof SHIPPING_FIELD_ORDER)[number], string>> & {
    email?: string;
  },
) {
  if (errors.email) {
    document.getElementById("checkout-email")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    return;
  }
  for (const id of SHIPPING_FIELD_ORDER) {
    if (errors[id]) {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
  }
}

function cartLineTotal(line: CartLine): number {
  if (isAddonCartLine(line)) return line.unitPrice * line.amount;
  return line.price * line.quantity;
}

function addonQtyLabel(amount: number, input: AddonInputKind): string {
  if (input === "quantity") return String(Math.max(1, Math.round(amount)));
  const rounded = Math.round(amount * 100) / 100;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(2).replace(/\.?0+$/, "");
}

function lineAttributes(line: CartLine): string[] {
  if (isAddonCartLine(line)) {
    const unit =
      line.input === "meters"
        ? Number(line.amount) === 1
          ? "meter"
          : "meters"
        : Number(line.amount) === 1
          ? "unit"
          : "units";
    return [
      `${addonQtyLabel(line.amount, line.input)} ${unit}`,
    ];
  }
  const attrs: string[] = [];
  const parts = line.title.split(" · ");
  if (parts.length > 1) attrs.push(`SIZE: ${parts[parts.length - 1]}`);
  attrs.push(`QUANTITY: ${line.quantity}`);
  return attrs;
}

type StepNum = 1 | 2 | 3;

function StepHeading({
  id,
  n,
  title,
  currentStep,
}: {
  id: string;
  n: StepNum;
  title: string;
  currentStep: StepNum;
}) {
  return (
    <div
      className={`flex items-start gap-3 sm:gap-4 ${
        currentStep === n ? "" : "opacity-80"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums ${
          currentStep >= n
            ? "bg-foreground text-background"
            : "border border-line bg-white text-muted"
        }`}
      >
        {n}
      </span>
      <div className="min-w-0 pt-1">
        <h2
          id={id}
          className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground"
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

export function CheckoutView() {
  const { lines, subtotal, itemCount } = useCart();
  const [step, setStep] = useState<StepNum>(1);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [shippingErrors, setShippingErrors] = useState<
    Partial<Record<(typeof SHIPPING_FIELD_ORDER)[number], string>>
  >({});

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    country: DEFAULT_COUNTRY,
    province: "",
    city: "",
    postalCode: "",
    phoneLocal: "",
  });

  type PaymentMethod = "cod" | "card";

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(false);
  const [billing, setBilling] = useState<CheckoutAddress>({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    country: DEFAULT_COUNTRY,
    province: "",
    city: "",
    postalCode: "",
    phoneLocal: "",
  });
  const [billingErrors, setBillingErrors] = useState<
    Partial<Record<(typeof BILLING_FIELD_ORDER)[number], string>>
  >({});
  const [cardPan, setCardPan] = useState("");
  const [cardExpMonth, setCardExpMonth] = useState("");
  const [cardExpYear, setCardExpYear] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardErrors, setCardErrors] = useState<
    Partial<Record<PaymentCardFieldId, string>>
  >({});

  const prevStepRef = useRef<StepNum>(1);

  const expiryYearOptions = useMemo(() => {
    const y = new Date().getFullYear();
    return Array.from({ length: 16 }, (_, i) => String(y + i));
  }, []);

  const cityOptions = useMemo(() => {
    if (!shipping.province || !CITIES_BY_PROVINCE[shipping.province]) return [];
    return CITIES_BY_PROVINCE[shipping.province];
  }, [shipping.province]);

  const billingCityOptions = useMemo(() => {
    if (!billing.province || !CITIES_BY_PROVINCE[billing.province]) return [];
    return CITIES_BY_PROVINCE[billing.province];
  }, [billing.province]);

  const taxableSubtotal = subtotal;
  const total = taxableSubtotal + SHIPPING_PKR + FBR_POS_PKR;

  const clearShippingFieldError = useCallback(
    (fieldId: (typeof SHIPPING_FIELD_ORDER)[number]) => {
      setShippingErrors((prev) => {
        if (!prev[fieldId]) return prev;
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    },
    [],
  );

  const handleProvinceChange = useCallback(
    (province: string) => {
      setShippingErrors((prev) => {
        const next = { ...prev };
        delete next["ship-province"];
        delete next["ship-city"];
        return next;
      });
      setShipping((s) => {
        const cities = CITIES_BY_PROVINCE[province] ?? [];
        const nextCity =
          cities.includes(s.city) || !cities.length ? s.city : "";
        return { ...s, province, city: nextCity };
      });
    },
    [],
  );

  const handleBillingProvinceChange = useCallback((province: string) => {
    setBillingErrors((prev) => {
      const next = { ...prev };
      delete next["bill-province"];
      delete next["bill-city"];
      return next;
    });
    setBilling((s) => {
      const cities = CITIES_BY_PROVINCE[province] ?? [];
      const nextCity =
        cities.includes(s.city) || !cities.length ? s.city : "";
      return { ...s, province, city: nextCity };
    });
  }, []);

  const clearBillingFieldError = useCallback(
    (fieldId: (typeof BILLING_FIELD_ORDER)[number]) => {
      setBillingErrors((prev) => {
        if (!prev[fieldId]) return prev;
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    },
    [],
  );

  const goToShipping = useCallback(() => {
    const err = validateContactEmail(email);
    if (err) {
      setEmailError(err);
      requestAnimationFrame(() =>
        scrollToFirstFieldError({ email: err }),
      );
      return;
    }
    setEmailError(undefined);
    setStep(2);
  }, [email]);

  const goToPayment = useCallback(() => {
    const errs = validateShippingFields(shipping);
    const keys = Object.keys(errs);
    if (keys.length > 0) {
      setShippingErrors(errs);
      requestAnimationFrame(() => scrollToFirstFieldError(errs));
      return;
    }
    setShippingErrors({});
    setStep(3);
  }, [shipping]);

  useEffect(() => {
    const prev = prevStepRef.current;
    if (step > prev) {
      const headingId =
        step === 2
          ? "checkout-shipping-heading"
          : step === 3
            ? "checkout-payment-heading"
            : null;
      if (headingId) {
        requestAnimationFrame(() => {
          document.getElementById(headingId)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }
    }
    prevStepRef.current = step;
  }, [step]);

  const clearCardFieldError = useCallback(
    (fieldId: PaymentCardFieldId) => {
      setCardErrors((prev) => {
        if (!prev[fieldId]) return prev;
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    },
    [],
  );

  const applyPromo = useCallback(() => {
    const t = promoCode.trim();
    if (!t) {
      setPromoMessage("Enter a promo code.");
      return;
    }
    setPromoMessage(
      "Promo codes are not active in this demo — your total is unchanged.",
    );
  }, [promoCode]);

  const placeOrder = useCallback(() => {
    if (!billingSameAsShipping) {
      const bErrs = validateBillingFields(billing);
      if (Object.keys(bErrs).length > 0) {
        setBillingErrors(bErrs);
        requestAnimationFrame(() => scrollToFirstBillingFieldError(bErrs));
        return;
      }
      setBillingErrors({});
    }

    if (paymentMethod === "cod") {
      setPromoMessage(null);
      alert("Thank you. Your cash on delivery order has been placed (demo).");
      return;
    }
    const errs = validateCardPayment({
      pan: cardPan,
      month: cardExpMonth,
      year: cardExpYear,
      cvv: cardCvv,
      name: cardName,
    });
    if (Object.keys(errs).length > 0) {
      setCardErrors(errs);
      requestAnimationFrame(() => scrollToFirstPaymentError(errs));
      return;
    }
    setCardErrors({});
    alert("Thank you. Your card payment has been submitted (demo).");
  }, [
    billingSameAsShipping,
    billing,
    paymentMethod,
    cardPan,
    cardExpMonth,
    cardExpYear,
    cardCvv,
    cardName,
  ]);

  if (lines.length === 0) {
    return (
      <div className="border-b border-line bg-background pb-16 pt-10 sm:pb-20 sm:pt-14">
        <Container>
          <h1 className="font-display text-2xl font-medium text-foreground sm:text-3xl">
            Checkout
          </h1>
          <p className="mt-4 text-muted">Your bag is empty.</p>
          <Link
            href="/shop"
            className="mt-8 inline-flex min-w-[11rem] items-center justify-center border border-foreground bg-foreground px-8 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-background transition-opacity hover:opacity-90"
          >
            Continue shopping
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="border-b border-line bg-background pb-16 pt-8 sm:pb-24 sm:pt-12">
      <Container>
        <h1 className="font-display text-2xl font-medium text-foreground sm:text-3xl">
          Checkout
        </h1>

        <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_min(24rem,34%)] lg:gap-12 xl:gap-16">
          {/* Main column */}
          <div className="min-w-0 space-y-12 lg:space-y-14">
            {/* Step 1 — Contact */}
            <section aria-labelledby="checkout-contact-heading">
              <StepHeading
                id="checkout-contact-heading"
                n={1}
                title="Contact Information"
                currentStep={step}
              />

              {step === 1 ? (
                <div className="mt-8 space-y-6 border border-foreground/20 bg-white p-6 sm:p-8">
                  <div>
                    <label
                      htmlFor="checkout-email"
                      className="mb-2 block text-xs font-medium uppercase tracking-wide text-foreground"
                    >
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="checkout-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      aria-invalid={emailError ? "true" : undefined}
                      aria-describedby={
                        emailError ? "checkout-email-error" : undefined
                      }
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(undefined);
                      }}
                      placeholder="you@example.com"
                      className={`w-full rounded-none bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted ${FORM_BORDER} ${FORM_FOCUS} ${emailError ? FORM_ERROR : ""}`}
                    />
                    {emailError ? (
                      <p
                        id="checkout-email-error"
                        role="alert"
                        className="mt-1.5 text-[11px] text-red-600"
                      >
                        {emailError}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={goToShipping}
                    className="w-full bg-foreground py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-background transition-opacity hover:opacity-90"
                  >
                    Proceed to shipping
                  </button>

                  <p className="text-center text-sm text-muted">
                    Already have an account?{" "}
                    <Link
                      href="/account"
                      className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 hover:text-gold hover:decoration-gold/50"
                    >
                      Sign in
                    </Link>
                  </p>

                  <div className="flex items-center gap-4">
                    <span className="h-px flex-1 bg-line" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                      Or sign in with
                    </span>
                    <span className="h-px flex-1 bg-line" />
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      type="button"
                      aria-label="Continue with Google"
                      className={`flex h-12 w-12 items-center justify-center rounded-none bg-white text-foreground transition-colors hover:bg-cream ${FORM_BORDER} ${FORM_FOCUS}`}
                    >
                      <GoogleGlyph />
                    </button>
                    <button
                      type="button"
                      aria-label="Continue with Facebook"
                      className={`flex h-12 w-12 items-center justify-center rounded-none bg-white text-[#1877f2] transition-colors hover:bg-cream ${FORM_BORDER} ${FORM_FOCUS}`}
                    >
                      <FacebookGlyph />
                    </button>
                  </div>
                  <p className="text-center text-[11px] text-muted">
                    Social sign-in links are not connected yet — buttons are for
                    layout preview only.
                  </p>
                </div>
              ) : (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border border-line bg-cream/40 px-5 py-4">
                  <p className="text-sm text-foreground">
                    <span className="font-medium text-muted">Email: </span>
                    {email}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-semibold uppercase tracking-wide text-foreground underline decoration-foreground/30 underline-offset-4 hover:text-gold"
                  >
                    Edit
                  </button>
                </div>
              )}
            </section>

            {/* Step 2 — Shipping */}
            <section
              aria-labelledby="checkout-shipping-heading"
              className="scroll-mt-24 lg:scroll-mt-28"
            >
              <StepHeading
                id="checkout-shipping-heading"
                n={2}
                title="Shipping"
                currentStep={step}
              />

              {(step === 2 || step === 3) && (
                <div className="mt-8 space-y-5 border border-foreground/20 bg-white p-6 sm:p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="ship-fn"
                      label="First name"
                      required
                      value={shipping.firstName}
                      error={shippingErrors["ship-fn"]}
                      onChange={(v) => {
                        setShipping((s) => ({ ...s, firstName: v }));
                        clearShippingFieldError("ship-fn");
                      }}
                      autoComplete="given-name"
                      disabled={step === 3}
                    />
                    <Field
                      id="ship-ln"
                      label="Last name"
                      required
                      value={shipping.lastName}
                      error={shippingErrors["ship-ln"]}
                      onChange={(v) => {
                        setShipping((s) => ({ ...s, lastName: v }));
                        clearShippingFieldError("ship-ln");
                      }}
                      autoComplete="family-name"
                      disabled={step === 3}
                    />
                  </div>

                  <Field
                    id="ship-a1"
                    label="Address line 1"
                    required
                    value={shipping.address1}
                    error={shippingErrors["ship-a1"]}
                    onChange={(v) => {
                      setShipping((s) => ({ ...s, address1: v }));
                      clearShippingFieldError("ship-a1");
                    }}
                    autoComplete="address-line1"
                    disabled={step === 3}
                  />

                  <Field
                    id="ship-a2"
                    label="Address line 2"
                    value={shipping.address2}
                    onChange={(v) =>
                      setShipping((s) => ({ ...s, address2: v }))
                    }
                    autoComplete="address-line2"
                    disabled={step === 3}
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormSelect
                      id="ship-country"
                      label="Country"
                      required
                      value={shipping.country}
                      disabled={step === 3}
                      error={shippingErrors["ship-country"]}
                      onChange={(v) => {
                        setShipping((s) => ({ ...s, country: v }));
                        clearShippingFieldError("ship-country");
                      }}
                    >
                      <option value={DEFAULT_COUNTRY}>{DEFAULT_COUNTRY}</option>
                    </FormSelect>

                    <FormSelect
                      id="ship-province"
                      label="Province"
                      required
                      value={shipping.province}
                      disabled={step === 3}
                      error={shippingErrors["ship-province"]}
                      onChange={(v) => handleProvinceChange(v)}
                    >
                      <option value="">Select an option</option>
                      {PROVINCES.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </FormSelect>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormSelect
                      id="ship-city"
                      label="City"
                      required
                      value={shipping.city}
                      disabled={step === 3 || !shipping.province}
                      error={shippingErrors["ship-city"]}
                      onChange={(v) => {
                        setShipping((s) => ({ ...s, city: v }));
                        clearShippingFieldError("ship-city");
                      }}
                    >
                      <option value="">
                        {shipping.province
                          ? "Select an option"
                          : "Select province first"}
                      </option>
                      {cityOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </FormSelect>

                    <Field
                      id="ship-postal"
                      label="Postal code"
                      value={shipping.postalCode}
                      error={shippingErrors["ship-postal"]}
                      onChange={(v) => {
                        setShipping((s) => ({ ...s, postalCode: v }));
                        clearShippingFieldError("ship-postal");
                      }}
                      autoComplete="postal-code"
                      disabled={step === 3}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ship-phone"
                      className="mb-2 block text-xs font-medium uppercase tracking-wide text-foreground"
                    >
                      Phone number <span className="text-red-600">*</span>
                    </label>
                    <div
                      className={`flex rounded-none bg-white ${
                        shippingErrors["ship-phone"]
                          ? FORM_ERROR
                          : `${FORM_BORDER} ${FORM_FOCUS_WITHIN}`
                      }`}
                    >
                      <span className="flex shrink-0 items-center gap-2 border-r border-foreground/25 bg-cream/50 px-3 text-sm tabular-nums text-foreground">
                        <span aria-hidden className="text-lg leading-none">
                          🇵🇰
                        </span>
                        +92
                      </span>
                      <input
                        id="ship-phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        placeholder="03XXXXXXXXX"
                        value={shipping.phoneLocal}
                        disabled={step === 3}
                        aria-invalid={
                          shippingErrors["ship-phone"] ? "true" : undefined
                        }
                        aria-describedby={
                          shippingErrors["ship-phone"]
                            ? "ship-phone-error"
                            : undefined
                        }
                        onChange={(e) => {
                          setShipping((s) => ({
                            ...s,
                            phoneLocal: e.target.value.replace(/[^\d\s]/g, ""),
                          }));
                          clearShippingFieldError("ship-phone");
                        }}
                        className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted disabled:bg-transparent"
                      />
                    </div>
                    {shippingErrors["ship-phone"] ? (
                      <p
                        id="ship-phone-error"
                        role="alert"
                        className="mt-1.5 text-[11px] text-red-600"
                      >
                        {shippingErrors["ship-phone"]}
                      </p>
                    ) : (
                      <p className="mt-1.5 text-[11px] text-muted">
                        Enter your mobile number without the country code.
                      </p>
                    )}
                  </div>

                  {step === 2 ? (
                    <button
                      type="button"
                      onClick={goToPayment}
                      className="w-full bg-foreground py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-background transition-opacity hover:opacity-90"
                    >
                      Continue to payment
                    </button>
                  ) : (
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
                      <p className="text-sm text-muted">
                        Shipping details saved for this session.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs font-semibold uppercase tracking-wide text-foreground underline decoration-foreground/30 underline-offset-4 hover:text-gold"
                      >
                        Edit address
                      </button>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Step 3 — Payment */}
            <section
              aria-labelledby="checkout-payment-heading"
              className="scroll-mt-24 lg:scroll-mt-28"
            >
              <StepHeading
                id="checkout-payment-heading"
                n={3}
                title="Payment"
                currentStep={step}
              />

              {step === 3 ? (
                <div
                  id="checkout-payment-panel"
                  className="mt-8 space-y-8 border border-foreground/20 bg-white p-6 sm:p-8"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-2">
                    <input
                      id="checkout-promo"
                      type="text"
                      name="promo"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        setPromoMessage(null);
                      }}
                      placeholder="Promo code"
                      autoComplete="off"
                      className={`min-w-0 flex-1 rounded-md bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted ${FORM_BORDER} ${FORM_FOCUS}`}
                    />
                    <button
                      type="button"
                      onClick={applyPromo}
                      className="shrink-0 rounded-md bg-foreground/80 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-foreground"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage ? (
                    <p
                      role="status"
                      className="text-sm leading-relaxed text-muted"
                    >
                      {promoMessage}
                    </p>
                  ) : null}

                  <div
                    role="radiogroup"
                    aria-label="Payment method"
                    className="space-y-3"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={paymentMethod === "cod"}
                      onClick={() => {
                        setPaymentMethod("cod");
                        setCardErrors({});
                      }}
                      className={`flex w-full items-center gap-4 rounded-md border px-4 py-4 text-left transition-colors ${
                        paymentMethod === "cod"
                          ? "border-foreground bg-white shadow-sm"
                          : "border-foreground/15 bg-white hover:border-foreground/25"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          paymentMethod === "cod"
                            ? "border-foreground"
                            : "border-foreground/30"
                        }`}
                        aria-hidden
                      >
                        {paymentMethod === "cod" ? (
                          <span className="h-2.5 w-2.5 rounded-full bg-foreground" />
                        ) : null}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        Cash On Delivery
                      </span>
                    </button>

                    <button
                      type="button"
                      role="radio"
                      aria-checked={paymentMethod === "card"}
                      onClick={() => setPaymentMethod("card")}
                      className={`flex w-full items-center gap-4 rounded-md border px-4 py-4 text-left transition-colors ${
                        paymentMethod === "card"
                          ? "border-foreground bg-white shadow-sm"
                          : "border-foreground/15 bg-white hover:border-foreground/25"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          paymentMethod === "card"
                            ? "border-foreground"
                            : "border-foreground/30"
                        }`}
                        aria-hidden
                      >
                        {paymentMethod === "card" ? (
                          <span className="h-2.5 w-2.5 rounded-full bg-foreground" />
                        ) : null}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        Debit / Credit Card
                      </span>
                    </button>
                  </div>

                  {paymentMethod === "card" ? (
                    <div className="space-y-5 border-t border-foreground/10 pt-6">
                      <Field
                        id="pay-card"
                        label="Card number"
                        required
                        value={formatCardPanGroups(cardPan)}
                        error={cardErrors["pay-card"]}
                        inputMode="numeric"
                        autoComplete="cc-number"
                        onChange={(v) => {
                          setCardPan(v.replace(/\D/g, "").slice(0, 19));
                          clearCardFieldError("pay-card");
                        }}
                      />

                      <div className="grid gap-5 sm:grid-cols-2">
                        <FormSelect
                          id="pay-mm"
                          label="Expiration month"
                          required
                          value={cardExpMonth}
                          error={cardErrors["pay-mm"]}
                          onChange={(v) => {
                            setCardExpMonth(v);
                            clearCardFieldError("pay-mm");
                          }}
                        >
                          <option value="">Month</option>
                          {Array.from({ length: 12 }, (_, i) => {
                            const mm = String(i + 1).padStart(2, "0");
                            return (
                              <option key={mm} value={mm}>
                                {mm}
                              </option>
                            );
                          })}
                        </FormSelect>

                        <FormSelect
                          id="pay-yy"
                          label="Expiration year"
                          required
                          value={cardExpYear}
                          error={cardErrors["pay-yy"]}
                          onChange={(v) => {
                            setCardExpYear(v);
                            clearCardFieldError("pay-yy");
                          }}
                        >
                          <option value="">Year</option>
                          {expiryYearOptions.map((y) => (
                            <option key={y} value={y}>
                              {y.slice(-2)}
                            </option>
                          ))}
                        </FormSelect>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          id="pay-cvv"
                          label="Security code"
                          required
                          value={cardCvv}
                          error={cardErrors["pay-cvv"]}
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          maxLength={4}
                          onChange={(v) => {
                            setCardCvv(v.replace(/\D/g, "").slice(0, 4));
                            clearCardFieldError("pay-cvv");
                          }}
                        />
                        <Field
                          id="pay-name"
                          label="Cardholder name"
                          required
                          value={cardName}
                          error={cardErrors["pay-name"]}
                          autoComplete="cc-name"
                          onChange={(v) => {
                            setCardName(v);
                            clearCardFieldError("pay-name");
                          }}
                        />
                      </div>

                      <div className="flex items-start gap-2.5 pt-1 text-sm text-slate-600">
                        <LockGlyph className="mt-0.5 shrink-0 text-slate-500" />
                        <span>Your payment details are encrypted</span>
                      </div>
                    </div>
                  ) : null}

                  <div className="space-y-6 border-t border-foreground/10 pt-6">
                    <label
                      htmlFor="billing-same"
                      className="flex cursor-pointer items-start gap-3 text-sm text-muted"
                    >
                      <input
                        id="billing-same"
                        type="checkbox"
                        className="peer sr-only"
                        checked={billingSameAsShipping}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setBillingSameAsShipping(checked);
                          if (checked) setBillingErrors({});
                        }}
                      />
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-sm border border-foreground/25 bg-background transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:[&_svg]:opacity-100"
                      >
                        <svg
                          viewBox="0 0 12 10"
                          fill="none"
                          className="h-2.5 w-2.5 opacity-0 stroke-white"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M1 5.2 4.5 8.7 11 1.4" />
                        </svg>
                      </span>
                      <span className="leading-snug">
                        Billing address same as shipping
                      </span>
                    </label>

                    {!billingSameAsShipping ? (
                      <div className="space-y-5 border border-foreground/15 bg-cream/30 p-5 sm:p-6">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-foreground">
                          Billing address
                        </p>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field
                            id="bill-fn"
                            label="First name"
                            required
                            value={billing.firstName}
                            error={billingErrors["bill-fn"]}
                            onChange={(v) => {
                              setBilling((s) => ({ ...s, firstName: v }));
                              clearBillingFieldError("bill-fn");
                            }}
                            autoComplete="billing given-name"
                          />
                          <Field
                            id="bill-ln"
                            label="Last name"
                            required
                            value={billing.lastName}
                            error={billingErrors["bill-ln"]}
                            onChange={(v) => {
                              setBilling((s) => ({ ...s, lastName: v }));
                              clearBillingFieldError("bill-ln");
                            }}
                            autoComplete="billing family-name"
                          />
                        </div>

                        <Field
                          id="bill-a1"
                          label="Address line 1"
                          required
                          value={billing.address1}
                          error={billingErrors["bill-a1"]}
                          onChange={(v) => {
                            setBilling((s) => ({ ...s, address1: v }));
                            clearBillingFieldError("bill-a1");
                          }}
                          autoComplete="billing address-line1"
                        />

                        <Field
                          id="bill-a2"
                          label="Address line 2"
                          value={billing.address2}
                          onChange={(v) =>
                            setBilling((s) => ({ ...s, address2: v }))
                          }
                          autoComplete="billing address-line2"
                        />

                        <div className="grid gap-5 sm:grid-cols-2">
                          <FormSelect
                            id="bill-country"
                            label="Country"
                            required
                            value={billing.country}
                            error={billingErrors["bill-country"]}
                            onChange={(v) => {
                              setBilling((s) => ({ ...s, country: v }));
                              clearBillingFieldError("bill-country");
                            }}
                          >
                            <option value={DEFAULT_COUNTRY}>
                              {DEFAULT_COUNTRY}
                            </option>
                          </FormSelect>

                          <FormSelect
                            id="bill-province"
                            label="Province"
                            required
                            value={billing.province}
                            error={billingErrors["bill-province"]}
                            onChange={(v) => handleBillingProvinceChange(v)}
                          >
                            <option value="">Select an option</option>
                            {PROVINCES.map((p) => (
                              <option key={p} value={p}>
                                {p}
                              </option>
                            ))}
                          </FormSelect>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <FormSelect
                            id="bill-city"
                            label="City"
                            required
                            value={billing.city}
                            disabled={!billing.province}
                            error={billingErrors["bill-city"]}
                            onChange={(v) => {
                              setBilling((s) => ({ ...s, city: v }));
                              clearBillingFieldError("bill-city");
                            }}
                          >
                            <option value="">
                              {billing.province
                                ? "Select an option"
                                : "Select province first"}
                            </option>
                            {billingCityOptions.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </FormSelect>

                          <Field
                            id="bill-postal"
                            label="Postal code"
                            value={billing.postalCode}
                            error={billingErrors["bill-postal"]}
                            onChange={(v) => {
                              setBilling((s) => ({
                                ...s,
                                postalCode: v,
                              }));
                              clearBillingFieldError("bill-postal");
                            }}
                            autoComplete="billing postal-code"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="bill-phone"
                            className="mb-2 block text-xs font-medium uppercase tracking-wide text-foreground"
                          >
                            Phone number{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <div
                            className={`flex rounded-md bg-white ${
                              billingErrors["bill-phone"]
                                ? FORM_ERROR
                                : `${FORM_BORDER} ${FORM_FOCUS_WITHIN}`
                            }`}
                          >
                            <span className="flex shrink-0 items-center gap-2 border-r border-foreground/25 bg-cream/50 px-3 text-sm tabular-nums text-foreground">
                              <span aria-hidden className="text-lg leading-none">
                                🇵🇰
                              </span>
                              +92
                            </span>
                            <input
                              id="bill-phone"
                              name="bill-phone"
                              type="tel"
                              inputMode="numeric"
                              autoComplete="billing tel-national"
                              placeholder="03XXXXXXXXX"
                              value={billing.phoneLocal}
                              aria-invalid={
                                billingErrors["bill-phone"]
                                  ? "true"
                                  : undefined
                              }
                              aria-describedby={
                                billingErrors["bill-phone"]
                                  ? "bill-phone-error"
                                  : undefined
                              }
                              onChange={(e) => {
                                setBilling((s) => ({
                                  ...s,
                                  phoneLocal: e.target.value.replace(
                                    /[^\d\s]/g,
                                    "",
                                  ),
                                }));
                                clearBillingFieldError("bill-phone");
                              }}
                              className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted"
                            />
                          </div>
                          {billingErrors["bill-phone"] ? (
                            <p
                              id="bill-phone-error"
                              role="alert"
                              className="mt-1.5 text-[11px] text-red-600"
                            >
                              {billingErrors["bill-phone"]}
                            </p>
                          ) : (
                            <p className="mt-1.5 text-[11px] text-muted">
                              Enter your mobile number without the country code.
                            </p>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={placeOrder}
                    className="w-full rounded-md bg-foreground py-4 text-xs font-semibold uppercase tracking-[0.15em] text-background transition-opacity hover:opacity-90"
                  >
                    Place your order
                  </button>
                </div>
              ) : (
                <p className="mt-6 text-sm text-muted">
                  Complete shipping to continue to payment.
                </p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="mt-14 lg:mt-0">
            <div className="sticky top-28 border border-line bg-white p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
                <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">
                  Order summary ({itemCount})
                </h2>
                <p className="text-sm font-semibold tabular-nums text-foreground">
                  {formatRs(total)}
                </p>
              </div>

              <ul className="divide-y divide-line">
                {lines.map((line) => {
                  const totalLine = cartLineTotal(line);
                  const attrs = lineAttributes(line);
                  return (
                    <li key={line.id} className="flex gap-4 py-5">
                      <div className="relative h-24 w-[4.5rem] shrink-0 overflow-hidden bg-cream">
                        {line.image ? (
                          <Image
                            src={line.image}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="120px"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase leading-snug tracking-[0.08em] text-foreground">
                          {line.title}
                        </p>
                        <p className="mt-1 text-sm font-medium tabular-nums text-foreground">
                          {formatRs(totalLine)}
                        </p>
                        <ul className="mt-2 space-y-0.5 text-[11px] uppercase tracking-wide text-muted">
                          {attrs.map((a) => (
                            <li key={a}>{a}</li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 border-t border-line pt-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-foreground">
                  Amount summary
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">
                      Subtotal (inclusive of tax)
                    </dt>
                    <dd className="tabular-nums text-foreground">
                      {formatRs(taxableSubtotal)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Shipping</dt>
                    <dd className="tabular-nums text-foreground">
                      {formatRs(SHIPPING_PKR)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">FBR POS</dt>
                    <dd className="tabular-nums text-foreground">
                      {formatRs(FBR_POS_PKR)}
                    </dd>
                  </div>
                </dl>

                <div className="my-6 border-t border-dashed border-line" />

                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-foreground">
                    Total (PKR)
                  </span>
                  <span className="text-lg font-semibold tabular-nums text-foreground">
                    {formatRs(total)}
                  </span>
                </div>

                <div className="my-6 border-t border-dashed border-line" />

                <p className="text-[11px] leading-relaxed text-muted">
                  You may receive multiple packages for one order. Discounted
                  items are non-exchangeable &amp; non-returnable. Nationwide
                  orders will be delivered within 5–7 business days.
                </p>
              </div>
            </div>

            <Link
              href="/shop"
              className="mt-6 inline-block text-sm font-medium text-muted underline decoration-line underline-offset-4 hover:text-foreground"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      </Container>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  value,
  error,
  onChange,
  autoComplete,
  placeholder,
  disabled,
  inputMode,
  maxLength,
}: {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
  inputMode?: ComponentProps<"input">["inputMode"];
  maxLength?: number;
}) {
  const errId = `${id}-error`;
  const controlRing = error
    ? FORM_ERROR
    : `${FORM_BORDER} ${FORM_FOCUS}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium uppercase tracking-wide text-foreground"
      >
        {label}{" "}
        {required ? <span className="text-red-600">*</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        value={value}
        disabled={disabled}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errId : undefined}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        className={`w-full rounded-md bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted disabled:bg-cream/60 ${controlRing}`}
      />
      {error ? (
        <p id={errId} role="alert" className="mt-1.5 text-[11px] text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function FormSelect({
  id,
  label,
  required,
  error,
  value,
  disabled,
  onChange,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  const errId = `${id}-error`;
  const controlRing = error
    ? FORM_ERROR
    : `${FORM_BORDER} ${FORM_FOCUS}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium uppercase tracking-wide text-foreground"
      >
        {label}{" "}
        {required ? <span className="text-red-600">*</span> : null}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        disabled={disabled}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errId : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none rounded-md bg-white px-4 py-3 text-sm text-foreground disabled:bg-cream/60 ${controlRing}`}
      >
        {children}
      </select>
      {error ? (
        <p id={errId} role="alert" className="mt-1.5 text-[11px] text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function FacebookGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

function LockGlyph({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M7 11V8a5 5 0 0110 0v3M6 11h12v9H6v-9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
