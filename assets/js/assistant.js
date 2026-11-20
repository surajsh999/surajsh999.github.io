(function () {
  "use strict";

  var NAME = "Suraj Deshmukh";
  var ROLE = "AWS & DevOps Engineer";
  var EMAIL = "suraj.sh999@gmail.com";
  var LINKEDIN = "https://www.linkedin.com/in/suraj192118110/";
  var GITHUB = "https://github.com/surajsh999";

  var KB = [
    {
      id: "who",
      k: ["who", "about", "yourself", "summary", "background", "intro"],
      a: "<b>" + NAME + "</b> is an <b>" + ROLE + "</b> based in Hyderabad, India. His work focuses on AWS, CI/CD, infrastructure as code, containers, Linux automation, and reliable cloud operations."
    },
    {
      id: "cloud",
      k: ["cloud", "aws", "azure", "infrastructure", "iac", "terraform"],
      a: "Suraj works with AWS and Azure, including infrastructure as code with Terraform and CloudFormation, IAM, networking, storage, compute, and cloud observability."
    },
    {
      id: "devops",
      k: ["devops", "cicd", "ci cd", "pipeline", "automation", "deployment", "jenkins", "github actions"],
      a: "His DevOps focus includes repeatable CI/CD pipelines, automated builds and tests, deployment automation, Git workflows, Linux scripting, and operational reliability."
    },
    {
      id: "containers",
      k: ["docker", "container", "kubernetes", "helm", "orchestration"],
      a: "His container and orchestration toolkit includes Docker, Docker Compose, Kubernetes, Helm, and container registries."
    },
    {
      id: "skills",
      k: ["skills", "tools", "stack", "technologies", "expertise", "proficient"],
      a: "<b>Cloud:</b> AWS, Azure<br><b>DevOps:</b> Git, CI/CD, GitHub Actions, Jenkins, Linux, Bash, Python, YAML<br><b>Infrastructure:</b> Terraform, CloudFormation, Ansible<br><b>Containers:</b> Docker, Kubernetes, Helm<br><b>Operations:</b> Prometheus, Grafana, CloudWatch, logging and alerting"
    },
    {
      id: "projects",
      k: ["projects", "work", "portfolio", "repositories", "github", "code"],
      a: "You can browse Suraj's source code and current projects on <a href='" + GITHUB + "' target='_blank' rel='noopener'>GitHub</a>. Project details and verified outcomes should be added for each repository."
    },
    {
      id: "location",
      k: ["location", "based", "where", "city", "hyderabad", "remote"],
      a: "Suraj is based in Hyderabad, India."
    },
    {
      id: "contact",
      k: ["contact", "email", "reach", "hire", "hiring", "linkedin", "job", "role", "work", "available"],
      a: "Suraj is open to AWS, DevOps, Cloud Engineering, and Site Reliability opportunities.<br><br>📧 <a href='mailto:" + EMAIL + "'>" + EMAIL + "</a><br>💼 <a href='" + LINKEDIN + "' target='_blank' rel='noopener'>LinkedIn</a><br>💻 <a href='" + GITHUB + "' target='_blank' rel='noopener'>GitHub</a>"
    }
  ];

  var JUMP = {
    who: "about", cloud: "skills", devops: "skills", containers: "skills",
    skills: "skills", projects: "work", location: "about", contact: "contact"
  };

  function normalize(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  }

  function findAnswer(question) {
    var query = normalize(question);
    var stop = { the: 1, a: 1, an: 1, is: 1, are: 1, to: 1, in: 1, on: 1, for: 1, and: 1, how: 1, what: 1, tell: 1, me: 1, about: 1 };
    var terms = query.split(" ").filter(function (word) { return word && !stop[word] && word.length > 1; });
    var best = null;
    var bestScore = 0;

    KB.forEach(function (entry) {
      var score = 0;
      entry.k.forEach(function (keyword) {
        var normalized = normalize(keyword);
        if (query === normalized) score += 12;
        else if (query.indexOf(normalized) !== -1) score += 8;
        else if (terms.indexOf(normalized) !== -1) score += 5;
      });
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    });

    if (!best) {
      return "I couldn't find that in the portfolio. Try asking about <b>cloud</b>, <b>DevOps</b>, <b>containers</b>, <b>skills</b>, <b>projects</b>, or <b>contact</b>.<br><br>📧 <a href='mailto:" + EMAIL + "'>" + EMAIL + "</a>";
    }
    return best.a;
  }

  var GREETING = /^(hi|hey|hello|namaste|good (morning|afternoon|evening))\b/i;
  var THANKS = /(thank|thanks|thx|cheers|appreciate)/i;

  document.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "assistantForm") event.preventDefault();
  });

  window.portfolioAssistant = {
    answer: function (question) {
      if (GREETING.test(question)) {
        return "Hello! Ask me about <b>Suraj's cloud, DevOps, container, or contact details</b>.";
      }
      if (THANKS.test(question)) return "You're welcome.";
      return findAnswer(question);
    },
    jumpId: function (question) {
      var query = normalize(question);
      var result = null;
      KB.forEach(function (entry) {
        entry.k.forEach(function (keyword) {
          if (query.indexOf(normalize(keyword)) !== -1) result = entry.id;
        });
      });
      return JUMP[result] || null;
    }
  };
})();
