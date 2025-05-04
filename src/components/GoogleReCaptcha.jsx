// components/ReCaptcha.jsx
import ReCAPTCHA from "react-google-recaptcha";

export default function GoogleReCaptcha({ onChange }) {
  return (
    <div className="mt-6">
      <ReCAPTCHA
        sitekey="6LfIVS0rAAAAANyAiL1rxVGT17I_pOPPFgdqbvfI" // ⬅️ replace with your actual reCAPTCHA v2 site key
        onChange={onChange}
      />
    </div>
  );
}
