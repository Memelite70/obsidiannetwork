async function loadintodiv(existingDivId) {
  try {
      const response = await fetch('/js/footer.html');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const footerHtml = await response.text();
      const existingDiv = document.getElementById(existingDivId);
      if (existingDiv) {
          existingDiv.innerHTML = footerHtml;
      } else {
          console.error(`Div with ID "${existingDivId}" not found.`);
      }
  } catch (error) {
      console.error('Error loading footer:', error);
  }
}
loadintodiv('footer');