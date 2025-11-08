function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
    pais: "",
  });

  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  // Validación de campos
  const validateForm = () => {
    const newErrors = {};

    // Validación del nombre
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (formData.name.length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    // Validación del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Por favor ingrese un correo electrónico válido";
    }

    // Validación del mensaje
    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    } else if (formData.message.length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    // Validación del país
    if (!formData.pais) {
      newErrors.pais = "Por favor seleccione un país";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      // Simulamos el envío del formulario
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula una petición
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          message: "",
          pais: "",
        });
        setTimeout(() => setSubmitSuccess(false), 5000); // Reset el mensaje de éxito después de 5 segundos
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        alert(
          "Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo."
        );
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="container mx-auto px-4 py-8 bg-[#F3F3F3] rounded-lg">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Formulario de Contacto */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Contacto
            </h2>
            <p className="text-gray-600 mb-6">Envianos un mensaje :)</p>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg transition-all duration-500 animate-fade-in">
                ¡Gracias por contactarnos! Te responderemos pronto.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nombre:"
                  className="w-full p-2 bg-gray-100 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email:"
                  className="w-full p-2 bg-gray-100 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  placeholder="Teléfono:"
                  className="w-full p-2 bg-gray-100 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Mensaje:"
                  className="w-full p-2 bg-gray-100 border border-gray-200 rounded focus:outline-none focus:border-blue-500 resize-none"
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition-colors"
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </div>

          {/* Información de Contacto */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Informacion de contacto:
            </h3>
            <div className="space-y-3">
              <p className="text-gray-600">
                <span className="font-medium">Direccion:</span>
                <br />
                Calle VideojuegosMVP 123
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Telefono:</span>
                <br />
                +51749875
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span>
                <br />
                videojuegosmvp@gmail.com
              </p>
            </div>

            {/* Síguenos */}
            <div className="mt-6">
              <p className="text-gray-600 mb-2">Siguenos</p>
              <div className="flex space-x-2">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600"
                >
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-700"
                >
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Mapa */}
            <div className="mt-6">
              <div className="rounded overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.1234567890123!2d-76.12345678901234!3d-9.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1234567890123456%3A0x1234567890123456!2sAv.%20Principal%20123%2C%20La%20Molina%2C%20Lima%2C%20Per%C3%BA!5e0!3m2!1sen!2sus!4v1612345678901"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="rounded"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<ContactForm />, document.getElementById("contact-content"));
