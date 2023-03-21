"use strict";
/////////////////////////////////////////////////
// BANKIST APP
/////////////////////////////////////////////////
// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  interestRate: 1.2, // %
  pin: 1111,
  movements: [
    {
      amount: 200,
      date: "2019-11-18T21:31:17.178Z",
    },
    {
      amount: 450,
      date: "2019-12-23T07:42:02.383Z",
    },
    {
      amount: -400,
      date: "2020-01-28T09:15:04.904Z",
    },
    {
      amount: 3000,
      date: "2020-04-01T10:17:24.185Z",
    },
    {
      amount: -650,
      date: "2020-05-08T14:11:59.604Z",
    },
    {
      amount: -130,
      date: "2023-03-05T17:01:12.194Z",
      // date: '2020-05-27T17:01:17.194Z',
    },
    {
      amount: 70,
      // date: '2020-07-11T23:36:17.929Z',
      date: "2023-03-06T23:36:17.929Z",
    },
    {
      amount: 1300,
      // date: '2020-07-12T10:51:36.790Z',
      date: "2023-03-08T10:51:36.790Z",
    },
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  interestRate: 1.5,
  pin: 2222,
  movements: [
    {
      amount: 5000,
      date: "2019-11-01T13:15:33.035Z",
    },
    {
      amount: 3400,
      date: "2019-11-30T09:48:16.867Z",
    },
    {
      amount: -150,
      date: "2019-12-25T06:04:23.907Z",
    },
    {
      amount: -790,
      date: "2020-01-25T14:18:46.235Z",
    },
    {
      amount: -3210,
      date: "2020-02-05T16:33:06.386Z",
    },
    {
      amount: -1000,
      date: "2020-04-10T14:43:26.374Z",
    },
    {
      amount: 8500,
      date: "2020-06-25T18:49:59.371Z",
    },
    {
      amount: -30,
      date: "2020-07-26T12:01:20.894Z",
    },
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  interestRate: 0.7,
  pin: 3333,

  movements: [
    {
      amount: 200,
      date: "2019-11-01T13:15:33.035Z",
    },
    {
      amount: -200,
      date: "2019-11-30T09:48:16.867Z",
    },
    {
      amount: 340,
      date: "2019-12-25T06:04:23.907Z",
    },
    {
      amount: -300,
      date: "2020-01-25T14:18:46.235Z",
    },
    {
      amount: -20,
      date: "2020-02-05T16:33:06.386Z",
    },
    {
      amount: 50,
      date: "2020-04-10T14:43:26.374Z",
    },
    {
      amount: 400,
      date: "2020-06-25T18:49:59.371Z",
    },
    {
      amount: -460,
      date: "2020-07-26T12:01:20.894Z",
    },
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Sarah Smith",
  interestRate: 1,
  pin: 4444,

  movements: [
    {
      amount: 430,
      date: "2019-11-01T13:15:33.035Z",
    },
    {
      amount: 1000,
      date: "2019-11-30T09:48:16.867Z",
    },
    {
      amount: 700,
      date: "2019-12-25T06:04:23.907Z",
    },
    {
      amount: 50,
      date: "2020-01-25T14:18:46.235Z",
    },
    {
      amount: 90,
      date: "2020-02-05T16:33:06.386Z",
    },
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

// Elements
/////////////////////////////////////////////////
const inputLoginUsername = document.querySelector(".input-user-name");
const inputLoginPin = document.querySelector(".input-password");
const inputTransferTo = document.getElementById("transfer-to");
const inputTransferAmount = document.getElementById("transfer-amount");
const inputLoanAmount = document.getElementById("loan-amount");
const inputCloseUsername = document.getElementById("current-user");
const inputClosePin = document.getElementById("current-pin");

const btnLogin = document.querySelector(".btn-login-submit");
const btnsort = document.querySelector(".btn-sort");
const btnTransfer = document.querySelector(".transfer-btn");
const btnLoan = document.querySelector(".loan-btn");
const btnClose = document.querySelector(".close-btn");

const welcomeMessageEl = document.querySelector(".welcome-message");
const errorMsgEl = document.querySelector(".error-msg");
const feedbackMsgEl = document.querySelector(".feedback-msg ");
const balanceEl = document.querySelector(".balance-number");
const nowDateEl = document.querySelector(".date");
const containerMovements = document.querySelector(".container-movements");
const incomeEl = document.querySelector(".income");
const outcomeEl = document.querySelector(".outcome");
// const interestEl = document.querySelector('.interest');
const timerEl = document.querySelector(".time-left");
/////////////////////////////////////////

// Make User names
const CreateUserNames = () => {
  accounts.forEach((acc) => {
    const names = acc.owner.toLocaleLowerCase().split(" ");
    acc.userName = "";
    names.forEach((_name) => (acc.userName += _name.slice(0, 1)));
  });
};
const welcome = function () {
  welcomeMessageEl.textContent = `Good Day, ${currentUser.owner
    .split(" ")
    .slice(0, 1)} `;
};
CreateUserNames();

//  timer will begin after login , reset after each gtransfer or loan request
let timer;
let currentUser;
let sorted = false;
// 0day/0month/year..day, month have 2 digits if they are just one digit make the tens digit = 0

// const dayNow = `${now.getDate()}`.padStart(2, 0);
// const monthNow = `${now.getMonth() + 1}`.padStart(2, 0);
// const yearNow = now.getFullYear();
// const hoursNow = `${now.getHours()}`.padStart(2, 0);
// const minutesNow = `${now.getMinutes()}`.padStart(2, 0);
// nowDateEl.textContent = `As of ${dayNow}/${monthNow}/${yearNow}, ${hoursNow}:${minutesNow}`;

const formatMovementDate = function (date, locale) {
  const calcDayPassed = function (date1, date2) {
    return Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  };
  const daysPassed = calcDayPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  //  Within this week
  if (daysPassed <= 7) return `${daysPassed} days ago `;

  // Else
  /*
  const movementDay = `${date.getDate()}`.padStart(2, 0);
  const movementMonth = `${date.getMonth() + 1}`.padStart(2, 0);
  const movementYear = date.getFullYear();
  return `${movementDay}/${movementMonth}/${movementYear}`;
*/
  return new Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (userMovements) {
  // const userMovements = currentUser.movements;
  // let allMovementsHtml = [];
  containerMovements.innerHTML = "";

  userMovements.forEach(function (mov, i) {
    const movementDate = new Date(mov.date);
    const formattedDate = formatMovementDate(movementDate, currentUser.locale);

    const movementValue = formatCurrency(
      mov.amount,
      currentUser.locale,
      currentUser.currency
    );

    // insertAdjacentText XX
    containerMovements.insertAdjacentHTML(
      "afterbegin",
      `<div class="row-movement">
    <p class="transaction-type ${mov.amount > 0 ? "deposit" : "withdraw"}">
      <span class="transaction-order">${i + 1}</span> ${
        mov.amount > 0 ? " DEPOSIT" : " WITHDRAWAL"
      }</p>
    <p class="transaction-date">${formattedDate}</p>    
    <p class="transaction-amount">${movementValue}</p>         
  </div>
  `
    );
  });
  // <p class="transaction-amount">${mov.amount} eurosign</p>
};

const displayBalance = function (user) {
  user.balance = user.movements.reduce((acc, mov) => acc + mov.amount, 0);
  balanceEl.textContent = formatCurrency(
    user.balance,
    user.locale,
    user.currency
  );
};
const displayDateNow = function () {
  const now = new Date();
  const options = {
    // numeric // 2-digit // long
    minute: "numeric",
    hour: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  nowDateEl.textContent = new Intl.DateTimeFormat(
    currentUser.locale,
    options
  ).format(now);
};
const displaySummary = function (user) {
  // incomeEl.textContent = '';
  // outcomeEl.textContent = '';
  // interestEl.textContent = '';
  const userMovements = user.movements;

  const income = userMovements.reduce(function (acc, mov) {
    if (mov.amount > 0) return acc + mov.amount;
    else return acc;
  }, 0);
  incomeEl.textContent = formatCurrency(income, user.locale, user.currency);

  const outcome = Math.abs(
    userMovements.reduce(function (acc, mov) {
      if (mov.amount < 0) return acc + mov.amount;
      return acc;
    }, 0)
  );
  outcomeEl.textContent = formatCurrency(outcome, user.locale, user.currency);

  // const interest = userMovements
  //   .filter(mov => mov.amount > 0)
  //   .map(deposit => (deposit.amount * user.interestRate) / 100)
  //   .filter(int => int >= 1)
  //   .reduce((acc, int) => acc + int, 0);
  // interestEl.textContent = formatCurrency(interest, user.locale, user.currency);
};
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};
const updateUi = function (user) {
  document.querySelector(".main").classList.remove("hidden");
  displayMovements(user.movements);
  displayBalance(user);
  displaySummary(user);
  errorMsgEl.classList.add("feedback-hidden");
  feedbackMsgEl.classList.add("feedback-hidden");
};

// Login
btnLogin.addEventListener("click", function (e) {
  //  prevent reload to reserve values
  e.preventDefault();
  errorMsgEl.classList.add("feedback-hidden");
  feedbackMsgEl.classList.add("feedback-hidden");
  document.querySelector(".main").classList.add("hidden");

  const nameValue = inputLoginUsername.value;
  const pinValue = Number(inputLoginPin.value);
  if (nameValue && pinValue) {
    // Change CurrentUser variable
    currentUser = accounts.find((acc) => acc.userName === nameValue);
    if (currentUser && currentUser.pin === pinValue) {
      updateUi(currentUser);
      welcome();
      displayDateNow();
      // Change timer Var
      if (timer) clearInterval(timer);
      timer = beginLogoutTimer();
      // Change sorted to false
      sorted = false;
      btnsort.classList.remove("sorted");
    } else {
      errorMsgEl.classList.remove("feedback-hidden");
    }
  }
});

// Sort movements
btnsort.addEventListener("click", function () {
  if (!sorted) {
    const userMovements = currentUser?.movements
      ?.slice()
      .sort((mov1, mov2) => mov1.amount - mov2.amount);
    sorted = !sorted;
    btnsort.classList.add("sorted");
    displayMovements(userMovements);
  } else {
    displayMovements(currentUser?.movements);
    sorted = !sorted;
    btnsort.classList.remove("sorted");
  }
});

// Transfer To
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const transferAmount = Number(inputTransferAmount.value);
  const receiverName = inputTransferTo.value;
  const receiverAccount = accounts.find((acc) => acc.userName == receiverName);
  //
  inputTransferAmount.value = "";
  inputTransferTo.value = "";

  // check not -ve, <= your balance, not the current, receiver exists,
  if (
    transferAmount > 0 &&
    currentUser.balance >= transferAmount &&
    receiverName !== currentUser.userName &&
    receiverAccount
  ) {
    // Update  movements arrays
    currentUser.movements.push({
      amount: -transferAmount,
      date: new Date().toISOString(),
    });
    receiverAccount.movements.push({
      amount: transferAmount,
      date: new Date().toISOString(),
    });
    // Ui
    updateUi(currentUser);

    // Reset Timer
    clearInterval(timer);
    timer = beginLogoutTimer();
  }
});

// Request a loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  inputLoanAmount.value = "";
  if (
    loanAmount > 0 &&
    currentUser.movements.some((mov) => mov.amount >= 0.1 * loanAmount)
  ) {
    // Reset Timer
    clearInterval(timer);
    timer = beginLogoutTimer();
    // loan processing take 3 seconds!
    setTimeout(() => {
      // Update  movements arrays
      currentUser.movements.push({
        amount: loanAmount,
        date: new Date().toISOString(),
      });

      // Ui
      updateUi(currentUser);
    }, 2500);
  }
});

const beginLogoutTimer = function () {
  let interval = 10 * 60;
  const tick = () => {
    const mins = `${Math.trunc(interval / 60)}`.padStart(2, 0); //01 or 02 ..
    const seconds = `${interval % 60}`.padStart(2, 0);
    // Each 1s Do:
    // 1- Udate timer in UI
    timerEl.textContent = `${mins}:${seconds}`;

    //  2- If 00:00 Logout , terminate the timer (do not make it still open in the background even after logout!)
    if (interval === 0) {
      document.querySelector(".main").classList.add("hidden");
      welcomeMessageEl.textContent = "Log in to get started";
      clearInterval(timer);
      return;
    }
    // 3- Decrease the timer with 1
    // console.log(interval);
    interval--;
  };
  // Call tick at the beginnening , do not wait for 1s.
  tick();
  //  Call tick each 1s
  timer = setInterval(tick, 1000);
  return timer;
};

// Close Your Account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  const userName = inputCloseUsername.value;
  const userPin = Number(inputClosePin.value);
  inputClosePin.value = inputCloseUsername.value = "";

  if (userName === currentUser.userName && userPin === currentUser.pin) {
    const index = accounts.findIndex((acc) => acc === currentUser);
    accounts.splice(index, 1);
    // hidden{opacity:0}
    document.querySelector(".main").classList.add("hidden");
    feedbackMsgEl.classList.remove("feedback-hidden");
    welcomeMessageEl.textContent = "Log in to get started";
    // Terminate Timer
    clearInterval(timer);
  }
});
