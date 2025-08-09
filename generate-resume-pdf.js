const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const resumeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bobby Santiago - AI Engineer Resume</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: white;
      padding: 0;
      font-size: 10.5pt;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 50px;
    }
    
    /* Header */
    .header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 3px solid #0EA5E9;
      padding-bottom: 20px;
    }
    
    h1 {
      font-size: 28pt;
      font-weight: 700;
      color: #0EA5E9;
      margin-bottom: 5px;
    }
    
    .subtitle {
      font-size: 14pt;
      color: #555;
      margin-bottom: 10px;
      font-weight: 500;
    }
    
    .contact {
      font-size: 10pt;
      color: #666;
    }
    
    .contact a {
      color: #0EA5E9;
      text-decoration: none;
      margin: 0 8px;
    }
    
    /* Sections */
    h2 {
      font-size: 14pt;
      font-weight: 700;
      color: #0EA5E9;
      margin-top: 22px;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 5px;
    }
    
    h3 {
      font-size: 12pt;
      font-weight: 600;
      color: #333;
      margin-top: 15px;
      margin-bottom: 3px;
    }
    
    .job-meta {
      font-size: 10pt;
      color: #666;
      margin-bottom: 8px;
      font-style: italic;
    }
    
    /* Content */
    p {
      margin-bottom: 10px;
      text-align: justify;
    }
    
    ul {
      margin-left: 20px;
      margin-bottom: 10px;
    }
    
    li {
      margin-bottom: 5px;
      line-height: 1.5;
    }
    
    strong {
      color: #333;
      font-weight: 600;
    }
    
    /* Skills Grid */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin: 15px 0;
    }
    
    .skill-category {
      font-size: 9.5pt;
    }
    
    .skill-category h4 {
      font-size: 10.5pt;
      font-weight: 600;
      color: #0EA5E9;
      margin-bottom: 5px;
    }
    
    .skill-category ul {
      list-style: none;
      margin-left: 0;
    }
    
    .skill-category li {
      margin-bottom: 3px;
      padding-left: 10px;
      position: relative;
    }
    
    .skill-category li:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #0EA5E9;
    }
    
    /* Technical Skills */
    .tech-skills {
      margin: 15px 0;
      font-size: 9.5pt;
    }
    
    .tech-skills p {
      margin-bottom: 5px;
      text-align: left;
    }
    
    /* Projects */
    .projects {
      margin: 15px 0;
    }
    
    .projects li {
      margin-bottom: 6px;
    }
    
    /* Achievements */
    .achievements li {
      margin-bottom: 6px;
    }
    
    /* Page break control */
    @media print {
      .page-break {
        page-break-before: always;
      }
      
      body {
        font-size: 10pt;
      }
      
      .container {
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Bobby Santiago</h1>
      <div class="subtitle">AI Engineer & Senior Full-Stack Developer</div>
      <div class="contact">
        Los Angeles, CA | me@bobbysantiago.com |
        <a href="https://github.com/bullrico">GitHub: bullrico</a> |
        <a href="https://twitter.com/bsantidev">Twitter: @bsantidev</a>
      </div>
    </div>

    <!-- Professional Summary -->
    <h2>Professional Summary</h2>
    <p>
      AI Engineer with 17+ years of full-stack development experience, specializing in integrating Large Language Models (LLMs) 
      and machine learning systems into production applications. Currently building intelligent systems using FastAPI, open-source 
      models, and RAG architectures while leveraging deep expertise in Ruby on Rails for scalable backend development. Proven 
      track record implementing NLP solutions, fine-tuning models for domain-specific tasks, and optimizing AI workloads for 
      enterprise-scale deployments.
    </p>

    <!-- Core Competencies -->
    <h2>Core Competencies</h2>
    <div class="skills-grid">
      <div class="skill-category">
        <h4>AI & Machine Learning</h4>
        <ul>
          <li>LLM Integration (GPT-4, Claude)</li>
          <li>RAG Systems & Semantic Search</li>
          <li>Fine-tuning & Optimization</li>
          <li>FastAPI & ML Pipelines</li>
          <li>Vector Databases</li>
          <li>Prompt Engineering</li>
        </ul>
      </div>
      <div class="skill-category">
        <h4>Backend Development</h4>
        <ul>
          <li>Ruby on Rails (17+ years)</li>
          <li>Python (FastAPI, Flask)</li>
          <li>RESTful & GraphQL APIs</li>
          <li>PostgreSQL, Redis, MongoDB</li>
          <li>Microservices Architecture</li>
          <li>Real-time Data Processing</li>
        </ul>
      </div>
      <div class="skill-category">
        <h4>AI Infrastructure</h4>
        <ul>
          <li>Model Deployment & Serving</li>
          <li>GPU Optimization</li>
          <li>Streaming & WebSockets</li>
          <li>Background Job Processing</li>
          <li>Performance Monitoring</li>
          <li>Cost Optimization</li>
        </ul>
      </div>
    </div>

    <!-- Professional Experience -->
    <h2>Professional Experience</h2>

    <h3>AI Engineer & Technical Consultant</h3>
    <div class="job-meta">Independent | June 2022 - Present</div>
    <ul>
      <li>Architected and deployed production RAG system processing 100K+ documents using LangChain, achieving 95% accuracy in semantic search</li>
      <li>Built intelligent content classification system using fine-tuned Llama 2 models, reducing manual review time by 80%</li>
      <li>Developed FastAPI microservices for real-time AI inference, handling 1000+ requests/second with sub-200ms latency</li>
      <li>Implemented streaming chat interfaces with GPT-4 and Claude APIs for customer support automation</li>
      <li>Created custom embedding pipelines using Sentence Transformers for domain-specific similarity matching</li>
      <li>Integrated vector databases (Pinecone) with Rails applications for scalable semantic search capabilities</li>
    </ul>

    <h3>Senior Software Engineer (AI/ML Focus)</h3>
    <div class="job-meta">SurveyMonkey | June 2016 - June 2022</div>
    <ul>
      <li><strong>Built NLP-powered response analysis system</strong> processing 10M+ survey responses monthly using BERT-based models for sentiment analysis and topic classification</li>
      <li><strong>Implemented ML pipeline</strong> for automatic survey response tagging, achieving 92% accuracy and reducing manual categorization by 75%</li>
      <li><strong>Developed real-time anomaly detection</strong> system using statistical models to identify response patterns and data quality issues</li>
      <li><strong>Created predictive analytics features</strong> using time-series forecasting to help customers anticipate CX trends</li>
      <li>Optimized data processing pipeline handling millions of responses with sub-second query performance</li>
      <li>Led technical architecture for SurveyMonkey CX platform launch, delivered within 6-month deadline</li>
    </ul>

    <h3>Senior Software Engineer</h3>
    <div class="job-meta">chideo.com | August 2014 - June 2016</div>
    <ul>
      <li>Led Ruby on Rails application redesign for improved performance and scalability under high-traffic loads</li>
      <li>Designed RESTful API endpoints enabling seamless third-party integrations</li>
      <li>Implemented containerization and CI/CD pipelines, reducing deployment cycles</li>
    </ul>

    <h3>Software Developer</h3>
    <div class="job-meta">Seso Media LLC / A Hundred Years | February 2013 - August 2014</div>
    <ul>
      <li>Engineered full-stack web applications for clients including TED Ed and The Smithsonian</li>
      <li>Developed backend APIs and frontend interfaces for data-driven web experiences</li>
    </ul>

    <!-- Recent AI Projects -->
    <h2>Recent AI Projects</h2>
    <ul class="projects">
      <li><strong>Intelligent Document Processing:</strong> Built RAG system using LangChain and GPT-4 for automated contract analysis</li>
      <li><strong>Custom AI Agent Framework:</strong> Developed multi-agent system for complex task automation using Claude API</li>
      <li><strong>Fine-tuned Classification Models:</strong> Achieved 94% accuracy on domain-specific text classification using Llama 2</li>
      <li><strong>Real-time AI Chat System:</strong> Implemented WebSocket-based streaming chat with context management</li>
      <li><strong>Semantic Search Engine:</strong> Created vector search system processing 500K+ documents with sub-100ms response time</li>
    </ul>

    <!-- Technical Skills -->
    <h2>Technical Skills</h2>
    <div class="tech-skills">
      <p><strong>AI/ML Technologies:</strong> LangChain, Hugging Face Transformers, OpenAI API, Anthropic Claude, Llama 2/3, BERT, GPT-4, Sentence Transformers, scikit-learn, PyTorch</p>
      <p><strong>Vector Databases:</strong> Pinecone, Weaviate, Chroma, pgvector</p>
      <p><strong>Languages:</strong> Python, Ruby, JavaScript, SQL</p>
      <p><strong>Frameworks:</strong> FastAPI, Flask, Ruby on Rails, React, Next.js</p>
      <p><strong>Infrastructure:</strong> Docker, Kubernetes, AWS SageMaker, Model serving (TorchServe, Triton)</p>
      <p><strong>Data Processing:</strong> Pandas, NumPy, Apache Spark, Redis, Celery, Sidekiq</p>
    </div>

    <!-- Key Achievements -->
    <h2>Key Achievements</h2>
    <ul class="achievements">
      <li><strong>Reduced costs 60%</strong> by implementing efficient prompt engineering and caching strategies for LLM applications</li>
      <li><strong>Improved accuracy from 72% to 95%</strong> in document classification through fine-tuning and RAG implementation</li>
      <li><strong>Scaled AI system to 10M+ requests/month</strong> with 99.9% uptime using microservices architecture</li>
      <li><strong>Decreased response time by 85%</strong> through GPU optimization and model quantization techniques</li>
      <li><strong>Built production NLP pipeline</strong> processing millions of survey responses with real-time insights</li>
    </ul>

    <!-- Education -->
    <h2>Education</h2>
    <p>
      <strong>Bachelor of Science in Electrical Engineering</strong><br>
      University of Massachusetts, Amherst | 1987 - 1991<br>
      Field of Specialization: Telecommunications | Honors: Dean's List
    </p>
  </div>
</body>
</html>
`;

async function generatePDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setContent(resumeHTML, { waitUntil: 'networkidle0' });
  
  const pdfPath = path.join(__dirname, 'public', 'bobby-santiago-resume.pdf');
  
  // Ensure public directory exists
  if (!fs.existsSync(path.join(__dirname, 'public'))) {
    fs.mkdirSync(path.join(__dirname, 'public'));
  }
  
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    }
  });
  
  await browser.close();
  
  console.log(`PDF generated successfully at: ${pdfPath}`);
}

generatePDF().catch(console.error);