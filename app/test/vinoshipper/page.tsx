"use client";

import { useState } from "react";

export default function VinoshipperTestPage() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    street1: "",
    street2: "",
    city: "",
    postalCode: "",
    stateCode: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
  });

  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/test/vinoshipper-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: {
              street1: formData.street1,
              street2: formData.street2 || null,
              city: formData.city,
              postalCode: formData.postalCode,
              stateCode: formData.stateCode,
            },
            dateOfBirth: {
              day: parseInt(formData.dobDay),
              month: parseInt(formData.dobMonth),
              year: parseInt(formData.dobYear),
            },
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Vinoshipper Order Test</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Test the Vinoshipper API integration by creating a test order.
      </p>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        {/* Customer Information */}
        <fieldset
          style={{
            marginBottom: "20px",
            padding: "20px",
            border: "1px solid #ddd",
          }}
        >
          <legend style={{ fontWeight: "bold", fontSize: "18px" }}>
            Customer Information
          </legend>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              style={{ width: "100%", padding: "8px", fontSize: "14px" }}
              placeholder="customer@example.com"
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}
          >
            <div>
              <label
                htmlFor="firstName"
                style={{ display: "block", marginBottom: "5px" }}
              >
                First Name *
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                style={{ width: "100%", padding: "8px", fontSize: "14px" }}
                placeholder="John"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Last Name *
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
                style={{ width: "100%", padding: "8px", fontSize: "14px" }}
                placeholder="Doe"
              />
            </div>
          </div>
        </fieldset>

        {/* Address */}
        <fieldset
          style={{
            marginBottom: "20px",
            padding: "20px",
            border: "1px solid #ddd",
          }}
        >
          <legend style={{ fontWeight: "bold", fontSize: "18px" }}>
            Shipping Address
          </legend>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="street1"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Street Address *
            </label>
            <input
              id="street1"
              type="text"
              value={formData.street1}
              onChange={(e) => handleInputChange("street1", e.target.value)}
              required
              style={{ width: "100%", padding: "8px", fontSize: "14px" }}
              placeholder="123 Main St"
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="street2"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Apartment, Suite, etc. (Optional)
            </label>
            <input
              id="street2"
              type="text"
              value={formData.street2}
              onChange={(e) => handleInputChange("street2", e.target.value)}
              style={{ width: "100%", padding: "8px", fontSize: "14px" }}
              placeholder="Apt 4B"
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: "15px",
            }}
          >
            <div>
              <label
                htmlFor="city"
                style={{ display: "block", marginBottom: "5px" }}
              >
                City *
              </label>
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
                style={{ width: "100%", padding: "8px", fontSize: "14px" }}
                placeholder="Napa"
              />
            </div>

            <div>
              <label
                htmlFor="stateCode"
                style={{ display: "block", marginBottom: "5px" }}
              >
                State *
              </label>
              <input
                id="stateCode"
                type="text"
                value={formData.stateCode}
                onChange={(e) =>
                  handleInputChange("stateCode", e.target.value.toUpperCase())
                }
                required
                maxLength={2}
                style={{ width: "100%", padding: "8px", fontSize: "14px" }}
                placeholder="CA"
              />
            </div>

            <div>
              <label
                htmlFor="postalCode"
                style={{ display: "block", marginBottom: "5px" }}
              >
                ZIP *
              </label>
              <input
                id="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
                required
                style={{ width: "100%", padding: "8px", fontSize: "14px" }}
                placeholder="94559"
              />
            </div>
          </div>
        </fieldset>

        {/* Date of Birth */}
        <fieldset
          style={{
            marginBottom: "20px",
            padding: "20px",
            border: "1px solid #ddd",
          }}
        >
          <legend style={{ fontWeight: "bold", fontSize: "18px" }}>
            Date of Birth
          </legend>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 2fr",
              gap: "15px",
            }}
          >
            <div>
              <label
                htmlFor="dobMonth"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Month *
              </label>
              <input
                id="dobMonth"
                type="number"
                min="1"
                max="12"
                value={formData.dobMonth}
                onChange={(e) => handleInputChange("dobMonth", e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  color:
                    formData.dobMonth &&
                    (parseInt(formData.dobMonth) < 1 ||
                      parseInt(formData.dobMonth) > 12)
                      ? "#c00"
                      : "#000",
                }}
                placeholder="1-12"
              />
            </div>

            <div>
              <label
                htmlFor="dobDay"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Day *
              </label>
              <input
                id="dobDay"
                type="number"
                min="1"
                max="31"
                value={formData.dobDay}
                onChange={(e) => handleInputChange("dobDay", e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  color:
                    formData.dobDay &&
                    (parseInt(formData.dobDay) < 1 ||
                      parseInt(formData.dobDay) > 31)
                      ? "#c00"
                      : "#000",
                }}
                placeholder="1-31"
              />
            </div>

            <div>
              <label
                htmlFor="dobYear"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Year *
              </label>
              <input
                id="dobYear"
                type="number"
                min="1900"
                max={new Date().getFullYear() - 21}
                value={formData.dobYear}
                onChange={(e) => handleInputChange("dobYear", e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  color:
                    formData.dobYear &&
                    parseInt(formData.dobYear) > new Date().getFullYear() - 21
                      ? "#c00"
                      : "#000",
                }}
                placeholder="1990"
              />
            </div>
          </div>
          <small style={{ color: "#666", marginTop: "5px", display: "block" }}>
            Customer must be 21+ years old
          </small>
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: loading ? "#ccc" : "#8B0000",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Creating Order..." : "Create Test Order"}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ color: "#c00", margin: "0 0 10px 0" }}>Error</h3>
          <pre
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              color: "#900",
            }}
          >
            {error}
          </pre>
        </div>
      )}

      {/* Response Display */}
      {response && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#efe",
            border: "1px solid #cfc",
            borderRadius: "5px",
          }}
        >
          <h3 style={{ color: "#060", margin: "0 0 10px 0" }}>Success!</h3>
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "15px",
              borderRadius: "5px",
              overflow: "auto",
            }}
          >
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
