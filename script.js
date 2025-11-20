// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close menu when a link is clicked
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// Contact Form Handling
const contactForm = document.getElementById("contactForm")
const formMessage = document.getElementById("formMessage")

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  }

  try {
    const response = await fetch("https://formsubmit.co/info@robotechx.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      formMessage.textContent = "Message sent successfully! We will get back to you soon."
      formMessage.classList.add("success")
      formMessage.classList.remove("error")
      contactForm.reset()
    } else {
      throw new Error("Failed to send message")
    }
  } catch (error) {
    console.log("[v0] Form submission error:", error)
    formMessage.textContent = "Failed to send message. Please try again or contact us directly."
    formMessage.classList.add("error")
    formMessage.classList.remove("success")
  }

  // Clear message after 5 seconds
  setTimeout(() => {
    formMessage.textContent = ""
    formMessage.classList.remove("success", "error")
  }, 5000)
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll(".filter-btn")
const galleryItems = document.querySelectorAll(".gallery-item-full")

console.log("[v0] Filter buttons found:", filterButtons.length)
console.log("[v0] Gallery items found:", galleryItems.length)

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("[v0] Filter button clicked")

    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    // Add active class to clicked button
    button.classList.add("active")

    // Get filter value
    const filterValue = button.getAttribute("data-filter")
    console.log("[v0] Filter value:", filterValue)

    // Filter gallery items
    galleryItems.forEach((item) => {
      const itemType = item.getAttribute("data-type")
      console.log("[v0] Item type:", itemType, "Filter value:", filterValue)

      if (filterValue === "all" || itemType === filterValue) {
        item.style.display = "block"
        item.classList.remove("hidden")
        item.style.animation = "none"
        setTimeout(() => {
          item.style.animation = "fadeInUp 0.6s ease-out"
        }, 10)
        console.log("[v0] Showing item:", itemType)
      } else {
        item.style.display = "none"
        item.classList.add("hidden")
        console.log("[v0] Hiding item:", itemType)
      }
    })
  })
})
