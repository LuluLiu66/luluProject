<template>
  <main>
    <div class="container">
      <div class="title">
        If retire in next year, How would you schedule your financial
        plan?（如果明年开始退休的话，你会如何安排你的财务计划?）
      </div>
      <div class="input-group">
        <label for="amount">Amount:(储蓄总金额)</label>
        <input type="number" v-model="amount" id="amount" />
      </div>
      <div class="input-group">
        <label for="initialAge">Initial Age:（领取退休金开始年龄）</label>
        <input type="number" v-model="initialAge" id="initialAge" />
      </div>
      <div class="input-group">
        <label for="estimateAge">Estimate Age:（预估最终寿命年龄）</label>
        <input type="number" v-model="estimateAge" id="estimateAge" />
      </div>
      <div class="button-group">
        <button @click="handleSubmit" class="btn">Submit（提交）</button>
      </div>
      <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>

      <div>
        <a href="https://www.ceicdata.com/zh-hans/indicator/china/consumer-price-index-cpi-growth" target="_blank">CPI data</a>
        <span> | </span>
        <a href="https://www.ceicdata.com/zh-hans/indicator/china/long-term-interest-rate" target="_blank">Rate of bond interest</a>
      </div>

      <div class="results-container">
        <div class="results-tab">
        <h2>1 year deposit(1年期存款)(可输入真实值)</h2>
        <div class="results" v-if="results.length">
          <ul>
            <li v-for="result in results" :key="result.year">
              <span class="rates"
                >previous 1 year Interest Rate: {{ result.interestRate }} previous 1 year CPI Rate:
                {{ result.cpiRate }}</span
              >
              <span class="year-age">Year: {{ result.year }}, Age: {{ result.age }}</span>
              <span class="salary-money"
                >Salary(年退休金): {{ result.salary }}, Left Money(剩余金额):
                {{ result.leftMoney }}</span
              >
            </li>
          </ul>
        </div>
        </div>
        
        <div class="results-tab">
        <h2>2 year deposit(2年期存款)(可输入真实值)</h2>
        <div class="results2" v-if="results2.length">
          <ul>
            <li v-for="result in results2" :key="result.year">
              <span class="rates"
                >Previous 2 year average Interest Rate: {{ result.interestRate }} Previous 2 year
                average CPI Rate: {{ result.cpiRate }}</span
              >
              <span class="year-age">Year: {{ result.year }}, Age: {{ result.age }}</span>
              <span class="salary-money"
                >Salary(年退休金): {{ result.salary }}, Left Money(剩余金额):
                {{ result.leftMoney }}</span
              >
            </li>
          </ul>
        </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'FinanceView',
  data() {
    return {
      amount: null,
      initialAge: null,
      estimateAge: null,
      errorMessage: '',
      results: [],
      results2: [],
      initialYear: 2025
    }
  },
  methods: {
    getCPIRateList() {
      const pensionDuration = this.estimateAge - this.initialAge
      let objList = {}
      for (var i = 1; i <= pensionDuration; i++) {
        const year = this.initialYear + i - 1
        // it means 1% - 4%
        const cpiRate = (Math.floor(Math.random() * 4) + 1) / 100
        objList[year] = cpiRate
      }
      // if need modify can input real data here to overwrite previous data
      return objList
    },
    getInterestRateList() {
      const pensionDuration = this.estimateAge - this.initialAge
      let objList = {}
      for (var i = 1; i <= pensionDuration; i++) {
        const year = this.initialYear + i - 1
        // it means 1% - 4%
        const interestRate = (Math.floor(Math.random() * 4) + 1) / 100
        objList[year] = interestRate
      }
      // if need modify can input real data here to overwrite previous data
      return objList
    },
    calculateSalary() {
      let leftMoney = this.amount
      const pensionDuration = this.estimateAge - this.initialAge
      const cpiRateList = this.getCPIRateList()
      const interestRateList = this.getInterestRateList()

      this.results = []
      for (var i = 1; i <= pensionDuration; i++) {
        const year = this.initialYear + i - 1
        const age = this.initialAge + i - 1

        const cpiRate = cpiRateList?.[year]
        const interestRate = interestRateList?.[year]

        let salary = leftMoney / (pensionDuration - i + 1)
        if (i !== 1) {
          salary = salary * (cpiRate + 1)
          leftMoney = leftMoney * interestRate + leftMoney - salary
        } else {
          leftMoney -= salary
        }

        this.results.push({
          year,
          age,
          salary: salary.toFixed(6),
          leftMoney: leftMoney.toFixed(6),
          cpiRate: i !== 1 ? `${cpiRate.toFixed(6) * 100}%` : '-',
          interestRate: i !== 1 ? `${interestRate.toFixed(6) * 100}%` : '-'
        })
      }
    },
    getCPIRateList2() {
      const pensionDuration = this.estimateAge - this.initialAge
      let objList = {}
      for (var i = 1; i <= pensionDuration; i += 2) {
        const year = this.initialYear + i - 1
        // it means 1% - 4%
        const cpiRate = (Math.floor(Math.random() * 4) + 1) / 100
        objList[year] = cpiRate
      }
      // if need modify can input real data here to overwrite previous data
      return objList
    },
    getInterestRateList2() {
      const pensionDuration = this.estimateAge - this.initialAge
      let objList = {}
      for (var i = 1; i <= pensionDuration; i += 2) {
        const year = this.initialYear + i - 1
        // it means 1.5% - 4.5%
        const interestRate = (Math.floor(Math.random() * 4) + 1.5) / 100
        objList[year] = interestRate
      }
      // if need modify can input real data here to overwrite previous data
      return objList
    },
    calculateSalary2() {
      let leftMoney = this.amount
      const pensionDuration = this.estimateAge - this.initialAge
      const cpiRateList = this.getCPIRateList2() || {}
      const interestRateList = this.getInterestRateList2() || {}

      this.results2 = []
      for (var i = 1; i <= pensionDuration; i += 2) {
        // adopt the first year between 2 year
        const year = this.initialYear + i - 1
        const age = this.initialAge + i - 1

        // cpi and interest rate between 2 year
        const cpiRate = cpiRateList?.[year]
        const interestRate = interestRateList?.[year]

        // salary is 2 year total
        let salary2 = leftMoney / ((pensionDuration - i + 1) / 2)
        if (i !== 1) {
          salary2 = salary2 * (1 + cpiRate)
          leftMoney = leftMoney * interestRate * 2 + leftMoney - salary2
        } else {
          leftMoney -= salary2
        }

        this.results2.push({
          year,
          age,
          salary: (salary2 / 2).toFixed(6),
          leftMoney: leftMoney.toFixed(6),
          cpiRate: i !== 1 ? `${cpiRate.toFixed(6) * 100}%` : '-',
          interestRate: i !== 1 ? `${interestRate.toFixed(6) * 100}%` : '-'
        })
        this.results2.push({
          year: year + 1,
          age: age + 1,
          salary: (salary2 / 2).toFixed(6),
          leftMoney: '-',
          cpiRate: '-',
          interestRate: '-'
        })
      }
    },
    handleSubmit() {
      if (!this.amount || !this.initialAge || !this.estimateAge) {
        this.errorMessage = 'Please fill in all fields before submitting.'
      } else {
        this.errorMessage = ''
        this.calculateSalary()
        this.calculateSalary2()
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.input-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  text-align: center;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.results-container {
  display: flex;
  gap: 20px;
  max-height: 900px;
  margin-top: 20px;
}

.results-tab {
  width: 50%;
}

.results,
.results2 {
  max-height: 400px;
  overflow: scroll;
  margin-bottom: 20px;
}

.results h2,
.results2 h2 {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.results ul,
.results2 ul {
  list-style-type: none;
  padding: 0;
}

.results li,
.results2 li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.year-age,
.salary-money,
.rates {
  display: block;
  margin-bottom: 5px;
}

.year-age {
  font-weight: bold;
}

.salary-money,
.rates {
  color: #555;
}
</style>
