/* Zaky Dental - Material Tabs Switcher Logic */

document.addEventListener('DOMContentLoaded', () => {
  initMaterialTabs();
});

function initMaterialTabs() {
  const tabButtons = document.querySelectorAll('.material-tabs .tab-btn');
  const tabPanels = document.querySelectorAll('.material-panel');

  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      // Update active tab button
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show target panel
      tabPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.style.display = 'block';
        } else {
          panel.style.display = 'none';
        }
      });
    });
  });
}
