// State: show homepage by default
document.getElementById('homepage').style.display = 'block';
document.getElementById('app').style.display = 'none';

function showApp() {
  document.getElementById('homepage').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  showSection('dashboard');
  initDashboard();
}

// Registration simulation
document.getElementById('registrationForm').onsubmit = function(e) {
  e.preventDefault();
  showApp();
};

// Sidebar section navigation
function showSection(sectionId) {
  const sections = document.querySelectorAll('.main-content section');
  sections.forEach(sec => sec.style.display = 'none');
  document.getElementById(sectionId).style.display = 'block';
}

// Earn tabs navigation
function showEarnTab(tab) {
  document.getElementById('earnPhotos').style.display = 'none';
  document.getElementById('earnVideos').style.display = 'none';
  document.getElementById('earnTrivia').style.display = 'none';
  if (tab === 'photos') document.getElementById('earnPhotos').style.display = 'block';
  if (tab === 'videos') document.getElementById('earnVideos').style.display = 'block';
  if (tab === 'trivia') document.getElementById('earnTrivia').style.display = 'block';
}

// Dummy user/session data
let user = {
  username: 'User',
  earnings: 0,
  referralEarningsL1: 0,
  referralEarningsL2: 0,
  photoEarnings: 0,
  videoEarnings: 0,
  triviaEarnings: 0,
  referralsL1: 0,
  referralsL2: 0,
  referralLink: '',
  availableBalance: 0,
  withdrawn: 0
};

// Dashboard setup
function initDashboard() {
  user.username = document.querySelector('#registrationForm input[name="username"]').value || "User";
  user.referralLink = window.location.origin + '/?ref=' + user.username;
  document.getElementById('dashboardUsername').textContent = user.username;
  document.getElementById('referralLink').textContent = user.referralLink;
  document.getElementById('userReferralLink').value = user.referralLink;
  updateEarnings();
}

// Copy referral link
function copyReferralLink() {
  const copyText = document.getElementById("userReferralLink");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Referral link copied!");
}

// Earn: Photos
const photos = [
  {src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', id: 1},
  {src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308', id: 2},
];
function loadPhotos() {
  const gallery = document.getElementById('photoGallery');
  gallery.innerHTML = '';
  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = 'Photo';
    img.onclick = function() {
      if (!img.classList.contains('liked')) {
        img.classList.add('liked');
        user.photoEarnings += 5;
        user.earnings += 5;
        user.availableBalance += 5;
        updateEarnings();
      }
    };
    gallery.appendChild(img);
  });
}

// Earn: Videos
const videos = [
  {src: 'https://www.w3schools.com/html/mov_bbb.mp4', id: 1},
];
function loadVideos() {
  const gallery = document.getElementById('videoGallery');
  gallery.innerHTML = '';
  videos.forEach(video => {
    const vid = document.createElement('video');
    vid.src = video.src;
    vid.controls = true;
    vid.onplay = function() {
      if (!vid.classList.contains('watched')) {
        vid.classList.add('watched');
        user.videoEarnings += 5;
        user.earnings += 5;
        user.availableBalance += 5;
        updateEarnings();
      }
    };
    gallery.appendChild(vid);
  });
}

// Earn: Trivia
const trivias = [
  {question: 'What is the capital of Kenya?', answer: 'Nairobi'},
  {question: '2 + 2 = ?', answer: '4'},
];
function loadTrivia() {
  const container = document.getElementById('triviaQuestions');
  container.innerHTML = '';
  trivias.forEach((t, idx) => {
    const div = document.createElement('div');
    div.style.marginBottom = '12px';
    div.innerHTML = `
      <strong>${t.question}</strong><br>
      <input type="text" id="triviaInput${idx}" placeholder="Your answer">
      <button onclick="submitTrivia(${idx})" class="btn-blue-outline">Submit</button>
      <span id="triviaResult${idx}"></span>
    `;
    container.appendChild(div);
  });
}
function submitTrivia(idx) {
  const input = document.getElementById('triviaInput'+idx);
  const result = document.getElementById('triviaResult'+idx);
  if (input.value.trim().toLowerCase() === trivias[idx].answer.toLowerCase()) {
    result.textContent = "✔ Correct! (+1 KES)";
    result.style.color = "#36cfc9";
    user.triviaEarnings += 1;
    user.earnings += 1;
    user.availableBalance += 1;
    updateEarnings();
  } else {
    result.textContent = "✘ Incorrect";
    result.style.color = "#fc3a3a";
  }
  input.disabled = true;
}

// Simulate referral earnings
function addReferral(level) {
  if (level === 1) {
    user.referralsL1 += 1;
    user.referralEarningsL1 += 100;
    user.earnings += 100;
    user.availableBalance += 100;
  } else if (level === 2) {
    user.referralsL2 += 1;
    user.referralEarningsL2 += 50;
    user.earnings += 50;
    user.availableBalance += 50;
  }
  updateEarnings();
}

// Update earnings in dashboard and referral section
function updateEarnings() {
  document.getElementById('totalEarnings').textContent = user.earnings + " KES";
  document.getElementById('referralEarningsL1').textContent = user.referralEarningsL1 + " KES";
  document.getElementById('referralEarningsL2').textContent = user.referralEarningsL2 + " KES";
  document.getElementById('likesEarnings').textContent = user.photoEarnings + " KES";
  document.getElementById('videoEarnings').textContent = user.videoEarnings + " KES";
  document.getElementById('triviaEarnings').textContent = user.triviaEarnings + " KES";
  document.getElementById('availableBalance').textContent = user.availableBalance + " KES";
  document.getElementById('withdrawnBalance').textContent = user.withdrawn + " KES";
  document.getElementById('referralEarningsL1_2').textContent = user.referralEarningsL1 + " KES";
  document.getElementById('referralEarningsL2_2').textContent = user.referralEarningsL2 + " KES";
  document.getElementById('referralCountL1').textContent = user.referralsL1;
  document.getElementById('referralCountL2').textContent = user.referralsL2;
}

// Withdrawal
document.getElementById('withdrawalForm').onsubmit = function(e) {
  e.preventDefault();
  const amt = parseFloat(this.amount.value);
  if (amt < 150) {
    document.getElementById('withdrawalMessage').textContent = "Minimum withdrawal is 150 KES.";
    document.getElementById('withdrawalMessage').style.color = "#fc3a3a";
    return;
  }
  if (amt > user.availableBalance) {
    document.getElementById('withdrawalMessage').textContent = "Insufficient balance.";
    document.getElementById('withdrawalMessage').style.color = "#fc3a3a";
    return;
  }
  const fee = Math.round(amt * 0.10);
  const finalAmt = amt - fee;
  user.availableBalance -= amt;
  user.withdrawn += finalAmt;
  updateEarnings();
  document.getElementById('withdrawalMessage').textContent =
    `Withdrawal successful! You will receive ${finalAmt} KES after 10% fee (${fee} KES).`;
  document.getElementById('withdrawalMessage').style.color = "#36cfc9";
  this.reset();
};

// Leaderboard (dummy data)
const leaderboard = [
  {username: 'Alice', earnings: 900, referrals: 20},
  {username: 'Bob', earnings: 850, referrals: 15},
  {username: 'Charlie', earnings: 800, referrals: 12},
  {username: 'You', earnings: 0, referrals: 0}
];
function loadLeaderboard() {
  const table = document.getElementById('leaderboardTable');
  table.innerHTML = '';
  leaderboard[3].earnings = user.earnings;
  leaderboard[3].referrals = user.referralsL1 + user.referralsL2;
  leaderboard.sort((a, b) => b.earnings - a.earnings);
  leaderboard.forEach((u, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i+1}</td>
      <td>${u.username}</td>
      <td>${u.earnings} KES</td>
      <td>${u.referrals}</td>
    `;
    table.appendChild(tr);
  });
}

function logout() {
  document.getElementById('app').style.display = 'none';
  document.getElementById('homepage').style.display = 'block';
}

// Initial load
window.onload = function() {
  loadPhotos();
  loadVideos();
  loadTrivia();
  loadLeaderboard();
};