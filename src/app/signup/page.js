// "use client";

// import React from "react";
// import { useForm, ValidationError } from "@formspree/react";
// import Link from "next/link";

// import { useState } from "react";

// export default function ContactForm() {
//   const [state, handleSubmit] = useForm("manonzjz");
//   if (state.succeeded) {
//     return <p>Thanks for joining!</p>;
//   }

//   return (
//     <div className="isolate bg-gray-950 px-6 py-24 sm:py-18 lg:px-8">
//       <div
//         aria-hidden="true"
//         className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
//       >
//         <div
//           style={{
//             clipPath:
//               "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//           }}
//           className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#60a5fa] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
//         />
//       </div>

//       <div className="mx-auto max-w-2xl text-center">
//         <div className="mb-10">
//           <Link href="/">
//             <span className="sr-only">fronteer</span>
//             <p className="text-3xl text-white">fronteer</p>
//           </Link>
//         </div>
//         <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
//           Sign up for early access
//         </h2>
//         <p className="mt-2 text-lg/8 text-gray-100">
//           Join the community to get notified on our launch!
//         </p>
//       </div>
//       <form
//         action="https://formspree.io/f/manonzjz"
//         method="POST"
//         className="mx-auto mt-16 max-w-xl sm:mt-20"
//       >
//         <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
//           <div>
//             <label
//               htmlFor="first-name"
//               className="block text-lg/6 font-semibold text-gray-100"
//             >
//               First name
//             </label>
//             <div className="mt-2.5">
//               <input
//                 id="first-name"
//                 name="first-name"
//                 type="text"
//                 autoComplete="given-name"
//                 className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
//               />
//             </div>
//           </div>
//           <div>
//             <label
//               htmlFor="last-name"
//               className="block text-lg/6 font-semibold text-gray-100"
//             >
//               Last name
//             </label>
//             <div className="mt-2.5">
//               <input
//                 id="last-name"
//                 name="last-name"
//                 type="text"
//                 autoComplete="family-name"
//                 className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
//               />
//             </div>
//           </div>

//           <div className="sm:col-span-2">
//             <label
//               htmlFor="email"
//               className="block text-lg/6 font-semibold text-gray-100"
//             >
//               Email
//             </label>
//             <div className="mt-2.5">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
//               />
//               <ValidationError
//                 prefix="Email"
//                 field="email"
//                 errors={state.errors}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="mt-10">
//           <button
//             type="submit"
//             disabled={state.submitting}
//             className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Join Waitlist
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import GoogleReCaptcha from "@/components/GoogleReCaptcha";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [status, setStatus] = useState("idle");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status === "succeeded") {
      router.push("/signup/success");
    }
  }, [status, router]);

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // 1. Submit to Formspree
      const formspreeRes = await fetch("https://formspree.io/f/manonzjz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          "first-name": formData.firstName,
          "last-name": formData.lastName,
          email: formData.email,
          "g-recaptcha-response": recaptchaToken,
        }),
      });

      // 2. Send Welcome Email
      const emailRes = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
        }),
      });

      if (formspreeRes.ok && emailRes.ok) {
        setStatus("succeeded");
      } else {
        setStatus("error");
        console.error("Formspree:", await formspreeRes.json());
        console.error("Email API:", await emailRes.json());
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="isolate bg-gray-950 px-6 py-24 sm:py-18 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#60a5fa] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-10">
          <Link href="/">
            <span className="sr-only">fronteer</span>
            <p className="text-3xl text-white">fronteer</p>
          </Link>
        </div>
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Sign up for early access
        </h2>
        <p className="mt-2 text-lg/8 text-gray-100">
          Join the community to get notified on our launch!
        </p>
      </div>

      <form
        onSubmit={handleCustomSubmit}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-lg/6 font-semibold text-gray-100"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="block text-lg/6 font-semibold text-gray-100"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                id="last-name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-lg/6 font-semibold text-gray-100"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
        </div>
        <GoogleReCaptcha onChange={(value) => setRecaptchaToken(value)} />

        <div className="mt-10">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {status === "submitting" ? "Joining..." : "Join Waitlist"}
          </button>
        </div>
      </form>
    </div>
  );
}
