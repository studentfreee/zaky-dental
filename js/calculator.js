/* Zaky Dental - Interactive Cost Estimator Logic */

const WA_NUMBER = "6281939198806";

const PRICING_DATA = {
  service: {
    "lepasan": { name: "Gigi Tiruan Lepasan", baseMin: 750000, baseMax: 1200000 },
    "crown": { name: "Crown & Bridge (Permanen)", baseMin: 1500000, baseMax: 2500000 },
    "full": { name: "Rahang Penuh (Full Denture)", baseMin: 3500000, baseMax: 5500000 }
  },
  material: {
    "valplast": { name: "Valplast (Fleksibel & Elastis)", multiplier: 1.2 },
    "akrilik": { name: "Akrilik Standard", multiplier: 1.0 },
    "logam": { name: "Frame Logam (Kuat & Tipis)", multiplier: 1.4 },
    "zirconia": { name: "Zirconia / Porcelain", multiplier: 1.8 }
  }
};

let currentEstimatorState = {
  service: "lepasan",
  material: "valplast",
  count: 1
};

document.addEventListener('DOMContentLoaded', () => {
  initCostEstimator();
});

function initCostEstimator() {
  const estimatorContainer = document.getElementById('cost-estimator-form');
  if (!estimatorContainer) return;

  const serviceOptions = document.querySelectorAll('[name="estimator-service"]');
  const materialOptions = document.querySelectorAll('[name="estimator-material"]');
  const countInput = document.getElementById('estimator-count');
  const countValueDisplay = document.getElementById('count-val-display');

  // Service radio listeners
  serviceOptions.forEach(opt => {
    opt.addEventListener('change', (e) => {
      currentEstimatorState.service = e.target.value;
      updateOptionSelectionVisuals('estimator-service');
      calculateAndRenderEstimate();
    });
  });

  // Material radio listeners
  materialOptions.forEach(opt => {
    opt.addEventListener('change', (e) => {
      currentEstimatorState.material = e.target.value;
      updateOptionSelectionVisuals('estimator-material');
      calculateAndRenderEstimate();
    });
  });

  // Quantity input listener
  if (countInput) {
    countInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10) || 1;
      currentEstimatorState.count = val;
      if (countValueDisplay) countValueDisplay.textContent = val;
      calculateAndRenderEstimate();
    });
  }

  // Initial calculation render
  updateOptionSelectionVisuals('estimator-service');
  updateOptionSelectionVisuals('estimator-material');
  calculateAndRenderEstimate();
}

function updateOptionSelectionVisuals(groupName) {
  const inputs = document.querySelectorAll(`[name="${groupName}"]`);
  inputs.forEach(input => {
    const parentCard = input.closest('.option-card');
    if (parentCard) {
      if (input.checked) {
        parentCard.classList.add('selected');
      } else {
        parentCard.classList.remove('selected');
      }
    }
  });
}

function formatRupiah(amount) {
  return "Rp " + amount.toLocaleString('id-ID');
}

function calculateAndRenderEstimate() {
  const serviceInfo = PRICING_DATA.service[currentEstimatorState.service] || PRICING_DATA.service["lepasan"];
  const materialInfo = PRICING_DATA.material[currentEstimatorState.material] || PRICING_DATA.material["valplast"];
  const count = Math.max(1, currentEstimatorState.count);

  let totalMin = Math.round(serviceInfo.baseMin * materialInfo.multiplier * (serviceInfo.name.includes("Full") ? 1 : count));
  let totalMax = Math.round(serviceInfo.baseMax * materialInfo.multiplier * (serviceInfo.name.includes("Full") ? 1 : count));

  const priceDisplay = document.getElementById('estimated-price-display');
  const detailsDisplay = document.getElementById('estimated-details-display');
  const waBtn = document.getElementById('estimator-wa-btn');

  const formattedPriceRange = `${formatRupiah(totalMin)} - ${formatRupiah(totalMax)}`;

  if (priceDisplay) {
    priceDisplay.textContent = formattedPriceRange;
  }

  if (detailsDisplay) {
    detailsDisplay.textContent = `${serviceInfo.name} • Bahan ${materialInfo.name} • ${serviceInfo.name.includes("Full") ? "Rahang Penuh" : count + " Unit Gigi"}`;
  }

  if (waBtn) {
    // Message build with encodeURIComponent for safe URL string
    const rawMessage = `Halo Zaky Dental, saya ingin berkonsultasi mengenai estimasi biaya pemasangan gigi tiruan:\n\n` +
      `• Jenis Layanan: ${serviceInfo.name}\n` +
      `• Pilihan Bahan: ${materialInfo.name}\n` +
      `• Jumlah Gigi: ${serviceInfo.name.includes("Full") ? "Rahang Penuh" : count + " unit"}\n` +
      `• Estimasi Biaya Web: ${formattedPriceRange}\n\n` +
      `Apakah bisa dijadwalkan untuk konsultasi & pemeriksaan awal? Terima kasih.`;

    const encodedMessage = encodeURIComponent(rawMessage);
    waBtn.href = `https://wa.me/${WA_NUMBER}?text=${encodedMessage}`;
  }
}
