import RegistrationForm from "../forms/RegistrationForm";
import RegistrationImage from "../styles/images/registration-illustration.svg"; // you can replace with a real screenshot later

export default function Register() {
  return (
    <section className="relative min-h-screen bg-background">
      {/* subtle split background (right side wash) */}
      <div className="absolute inset-0">
        <div className="h-full w-full lg:grid lg:grid-cols-2">
          <div className="hidden lg:block" />
          <div className="hidden lg:block bg-secondary/50" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* LEFT — FORM */}
          <div className="w-full max-w-xl">
            {/* small brand row */}
            <div className="mb-8">
              <p className="text-sm text-muted">
                <span className="font-semibold text-dark">Digital Biz</span>{" "}
                <span className="text-primary font-semibold">Kickstarter</span>
              </p>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl text-dark leading-[1.05]">
              Register for Workshop
            </h1>
            <p className="text-muted mt-3 mb-8 max-w-md leading-relaxed">
              Fill in your details to complete registration. Choose your session
              slot and we’ll confirm it on email.
            </p>

            {/* Form Card */}
            <div className="bg-white/90 backdrop-blur rounded-3xl border border-primary/10 shadow-sm p-6 sm:p-8 md:p-10">
              <RegistrationForm />
            </div>

            {/* micro note */}
            <p className="text-xs text-muted mt-5">
              By registering, you agree to our Terms & Privacy Policy.
            </p>
          </div>

          {/* RIGHT — PREVIEW CARD + VALUE */}
          <div className="hidden lg:block">
            <div className="flex flex-col items-center">
              {/* Preview Card */}
              {/* <div className="w-full max-w-xl rounded-3xl bg-white/70 backdrop-blur border border-primary/10 shadow-[0_25px_60px_rgba(0,0,0,0.12)] p-8"> */}
                {/* <div className="relative rounded-2xl overflow-hidden bg-background"> */}
                  {/* Replace with a real “dashboard/schedule preview” image later */}
                  <img
                    src={RegistrationImage}
                    alt="Workshop preview"
                    className="w-full h-[320px] object-contain"
                  />

                  {/* subtle glow */}
                  <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
                {/* </div> */}
              {/* </div> */}

              {/* Value Text */}
              <div className="mt-8 text-center max-w-md">
                <h3 className="font-heading text-2xl text-dark">
                  Track your workshop journey
                </h3>
                <p className="text-muted mt-2 leading-relaxed">
                  Get a clear schedule, guided steps, and session reminders so
                  you never feel lost — just supported.
                </p>

                {/* tiny “benefits” row */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {[
                    "Session slot booking",
                    "Email confirmation",
                    "Guided steps",
                  ].map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs rounded-full border border-primary/15 bg-white/70 text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE RIGHT CONTENT (optional) */}
          <div className="lg:hidden">
            <div className="mt-10 rounded-3xl bg-secondary/50 border border-primary/10 p-6">
              <h3 className="font-heading text-2xl text-dark">
                Track your workshop journey
              </h3>
              <p className="text-muted mt-2 leading-relaxed">
                Slot booking + confirmations + guided steps — everything stays
                simple and organized.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
