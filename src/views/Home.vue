<template>
  <main class="container">
    <section class="header">
      <img src="../assets/photo.png" alt="个人照片" class="profile-photo" />
      <div class="header-content">
        <h1>Lulu Liu</h1>
        <p>Web Developer</p>
        <p>lululiu66@126.com</p>
      </div>
    </section>
    <section class="experience">
      <h2>Experience</h2>
      <ul>
        <li>
          <h3>Binance</h3>
          <p>Web Developer</p>
          <p>Full-time · Dec 2018 - Dec 2024 · 6 yrs 1 mo</p>
          <ul>
            <li>
              <p>Singapore · On-site</p>
              <p>Apr 2022 - Dec 2024 · 2 yrs 9 mos</p>
              <p>
                1. Responsible for C2C trade flow feature<br/>
                2. According to PM's requirements and UX/UI, Achieve web functions.<br/>
                3. Assist Operation to solve CS's issues.<br/>
                4. Cooperate with BE to develop new products.<br/>
              </p>
            </li>
            <li>
              <p>Shanghai, China · Hybrid</p>
              <p>Dec 2018 - Mar 2022 · 3 yrs 4 mos</p>
              <p>
                1.Develop custom websites based on client driven requirements and design documents.<br/>
                2.Programmed interactive features: animations, text boxes, navigation buttons, messaging<br/>
                3.Systems in JavaScript, HTML, CSS.<br/>
              </p>
            </li>
          </ul>
        </li>
        <li>
          <h3>Pinduoduo</h3>
          <p>Web Developer</p>
          <p>Shanghai, China · On-site</p>
          <p>Full-time · Mar 2017 - Oct 2018 · 1 yr 8 mos</p>
          <p>
            1.Responsible for order, after-sale, logistics part in Organization Management System in Pinduoduo. <br/>   
            2.Help product managers to complete products by building webpage, following UI design.<br/>
            3.Cooperating with backend developers and quality assurance colleagues. I use React framework, bootstrap UI library, jquery.<br/>
          </p>
        </li>
      </ul>
    </section>
    <section class="education">
      <h2>Education</h2>
      <ul>
        <li>
          <h3>Tongji University</h3>
          <p>Bachelor's degree, Electronic Information Engineering</p>
          <p>Sep 2012 - Jul 2016</p>
        </li>
      </ul>
    </section>
    <section class="skills">
      <h2>Skills</h2>
      <p>
        Mono as an open source implementation, homebrew to install and config environment.<br/>
        My programming language is typescript and javascript, we also use node.js and koa to support SSR.<br/>
        Npm as an package management, and yarn as dependence management.<br/>
        I use eslint to assure everyone has the same code format.<br/>
        We use bazel as testing tool, jest as javascript testing framework.<br/>
        We use jenkins as CI/CD, which can deploy applications automatically.<br/>
        Git as an version control system, github enterprise platform to host our code, VS Code to edit code.
      </p>
    </section>
    <section class="languages">
      <h2>Languages</h2>
      <p>
        Chinese: Native<br/>
        English: Fluent<br/>
      </p>
    </section>
  </main>
</template>

<script>
export default {
  name: 'ResumeTemplate',
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>

<style scoped>
.container {
  width: 1000px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.header, .experience, .education, .skills, .languages {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: start;
}

.header-content {
  margin-left: 20px;
}

.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 15px;
}

h1, h2, h3 {
  margin: 0;
  padding: 0;
  color: #333;
}

p, ul {
  margin: 10px 0;
  padding: 0;
  color: #555;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}

.header h1 {
  font-size: 28px;
  color: #007bff;
}

.header p {
  font-size: 16px;
}

.experience h2, .education h2, .skills h2, .languages h2 {
  font-size: 22px;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.experience h3, .education h3 {
  font-size: 20px;
  color: #007bff;
}
</style>
