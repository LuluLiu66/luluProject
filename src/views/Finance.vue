<template>
  <main>
    <div class="container" style="width: 1000px">
      <div class="title">
        If you want to retire at 30 and live until 90, how would you schedule your financial plan?
      </div>
      <div class="input-group">
        <label for="amount">Amount:</label>
        <input type="number" v-model="amount" id="amount" />
      </div>
      <div class="button-group">
        <button @click="handleSubmit" class="btn">Submit</button>
      </div>
      <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      <div class="results" v-if="results.length" style="overflow-y: scroll; max-height: 400px">
        <h2>Results:(Assuming the cpi rate and interest rate are roughly the same for 60 years)</h2>
        <ul>
          <li v-for="result in results" :key="result.year">
            <span class="year-age">Year: {{ result.year }}, Age: {{ result.age }}</span
            >,
            <span class="salary-money"
              >Salary: {{ result.salary.toFixed(2) }}, Left Money:
              {{ result.leftMoney.toFixed(2) }}</span
            >,
            <span class="rates">
              Interest Rate:{{ result.interestRate.toFixed(2) }} CPI Rate:
              {{ result.cpiRate.toFixed(2) }},
            </span>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'FinanceView',
  data() {
    return {
      amount: null,
      results: [],
      errorMessage: ''
    }
  },
  methods: {
    calculateSalary() {
      let leftMoney = this.amount

      const initialYear = 2025
      const initialAge = 30

      this.results = []

      for (var i = 1; i <= 60; i++) {
        // Generate random cpiRate and interestRate between 0 and 3
        const cpiRate = (100 + Math.random() * 3) / 100
        const interestRate = (100 + Math.random() * 3) / 100

        // Calculate the salary for this year
        let salary = leftMoney / (60 - i + 1)

        if (i !== 1) {
          salary = salary * cpiRate
          leftMoney = leftMoney * interestRate - salary
        } else {
          leftMoney -= salary
        }

        this.results.push({
          year: initialYear + i - 1,
          age: initialAge + i - 1,
          salary: salary,
          leftMoney: leftMoney,
          cpiRate: cpiRate,
          interestRate: interestRate
        })
      }
    },
    handleSubmit() {
      if (!this.amount) {
        this.errorMessage = 'Please fill in the amount before submitting.'
      } else {
        this.errorMessage = ''
        this.calculateSalary()
      }
    }
  }
}
</script>

<style scoped>
.container {
  color: #000;
  width: 1000px;
  max-width: 100%;
  height: 100vh;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.title {
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
}

.input-group {
  margin-bottom: 15px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.input-group input {
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-group {
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.results {
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
}

.results h2 {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.results ul {
  list-style-type: none;
  padding: 0;
}

.results li {
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.year-age {
  color: #0000ff; /* Blue color for Year and Age */
}

.salary-money {
  color: #ff0000; /* Red color for Salary and Left Money */
}

.rates {
  color: #008000; /* Green color for CPI Rate and Interest Rate */
}
</style>
