import React ,{useEffect,useState} from "react";
import "../privacy policy/privacypolicy.css"; 
import Spiner from "../../components/Spiner/Spiner"

const PrivacyPolicy = () => {
  const [showspin, setShowSpin] = useState(true);


  useEffect(() => {
    setTimeout(() => {
        setShowSpin(false);
    }, 1200);
}, []);
    return (


      <>
      { showspin ? <Spiner /> : (
<div className="container">


<div className="privacy-policy">
      <h1>Privacy Policy</h1>

      <p>
        This Privacy Policy explains how we collect, use, and share your
        personal information when you visit our website or use our services.
      </p>

      <h3>What information do we collect?</h3>

      <p>
        We collect the following information from you:
      </p>

      <ul>
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your IP address</li>
        <li>The browser and operating system you are using</li>
        <li>The pages you visit on our website</li>
      </ul>

      <h3>How do we use your information?</h3>

      <p>
        We use your information to:
      </p>

      <ul>
        <li>Provide you with our services</li>
        <li>Improve our services</li>
        <li>Send you marketing emails</li>
      </ul>

      <h3>How do we share your information?</h3>

      <p>
        We share your information with the following third parties:
      </p>

      <ul>
        <li>Our web hosting provider</li>
        <li>Our email marketing provider</li>
      </ul>

      <h3>Your choices</h3>

      <p>
        You have the following choices regarding your personal information:
      </p>

      <ul>
        <li>You can unsubscribe from our marketing emails at any time.</li>
        <li>You can request access to your personal information.</li>
        <li>You can request that we erase your personal information.</li>
      </ul>

      <p>
        To exercise your choices, please contact us at privacy@example.com.
      </p>

      <h3>Changes to this Privacy Policy</h3>

      <p>
        We may update this Privacy Policy from time to time. If we make any
        significant changes, we will post a notice on our website.
      </p>

      <h3>Contact us</h3>

      <p>
        If you have any questions about this Privacy Policy, please contact us at
        privacy@example.com.
      </p>


      <h3>What information do we collect?</h3>

      <p>
        We collect the following information from you:
      </p>

      <ul>
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your IP address</li>
        <li>The browser and operating system you are using</li>
        <li>The pages you visit on our website</li>
      </ul>

      <h3>How do we use your information?</h3>

      <p>
        We use your information to:
      </p>

      <ul>
        <li>Provide you with our services</li>
        <li>Improve our services</li>
        <li>Send you marketing emails</li>
      </ul>

      <h3>How do we share your information?</h3>

      <p>
        We share your information with the following third parties:
      </p>

      <ul>
        <li>Our web hosting provider</li>
        <li>Our email marketing provider</li>
      </ul>

      <h3>Your choices</h3>

      <p>
        You have the following choices regarding your personal information:
      </p>

      <ul>
        <li>You can unsubscribe from our marketing emails at any time.</li>
        <li>You can request access to your personal information.</li>
        <li>You can request that we erase your personal information.</li>
      </ul>

      <p>
        To exercise your choices, please contact us at privacy@example.com.
      </p>

      <h3>Changes to this Privacy Policy</h3>

      <p>
        We may update this Privacy Policy from time to time. If we make any
        significant changes, we will post a notice on our website.
      </p>

      <h3>Contact us</h3>

      <p>
        If you have any questions about this Privacy Policy, please contact us at
        privacy@example.com.
      </p>
    </div>
</div>
)}
      </>

)
};

export default PrivacyPolicy;
