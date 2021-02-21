## THEME: HEALTHCARE

### Problem statement identified:

<p>With the growing lifestyle and comfort in day to day life humans are becoming weak and prone to health related issues Also in urban cities once a person got a little cold too he immediately approaches the specialist for his treatment which then suggest him to take allopathic medicines/steriod to get cured for an utter normal disease too like cold. </p><br>

<p>Also with time the importance of home made medicine so called (dadi/nani ke nuske) for treatment of small disease lie cought, cold, headache ,stomach ache are draining .Instead using those can prove to be much effective as well as useful as they are homemade and made of natural products </p>

### Solution:
<h3>One stop solution e-doctor </h3>
<p> This is the website made for the purpose of preserving our own medicinal culture and help each other for the treatment of small diseases.</p>

<h4>What does e doctor does ? <h4>
<p>It is a platform where user can register himself, know the disease he may have based on symptoms and get a guide how he can get cured from it through home made medicines</p>

<h5>Working </h5>
<p>Once user arrive he will be greeted with the landing page and the he/she can register themselves on registering onwards they can login themselves with proper credentials once login done they will be at dashboard where they had two options one to diagnose himself and other to add article on one of the home made medicine(article includes how to make that medicine what are the benefits of medicine, what the article is actaully for ect). suppose he move with diagnose then he need to choose the symptoms he/she is experiencing and based upon the symptoms he will receive the name of disease of which he can a patient of once getting disease information if the home medicinal cure article is availiable then he can receive the same by clicking on disease card (card displaying disease information) and follow accordingly to get cure on the other hand if he chooses to add an article he can do so by clicking on add article and put necessary information about the home medicine therapy he is also provided with feature to add ingredients information needed to make the medicine in the next step of the form where whether he can manually add the links with name or just select among already present products </p>

<h4>features: </h4>
<ul>
<li>User will get information regarding disease he may have from symptoms </li>
<li>Old home medicine culture is feature in the way article on it formed</li>
<li>Every article can be liked or disliked so that user can get the most trusted articles</li>
<li>Ingredients details(needed for making medicine) can be added with article</li>
<li> Login and sign up facility for user </li>
</ul>
  
### Step To Run Code
As we are using free api so token is expires after some time so in order to run this code you have to generate your own token.<br>
<h4>Step To Create Token</h4>
<p>go to <a href="https://apimedic.com/">apimedic.com</a> and create your account. If you already have an account on <a href="https://apimedic.com/">apimedic.com</a> then login with the same.<br>
  
After signup/login go to <a href="https://apimedic.com/apikeys">here</a> and copy your Sandbox Password.<br>

then go to <a href="https://sandbox-authservice.priaid.ch/docs.html">here.</a> and scroll down to the bottom of the page.<br>

Enter your email as username and sandbox password as password and click on generate Token.</p>

<h4>Step To Download Code</h4>
Clone this repo using `git clone https://github.com/The-Keshav-Agarwal/api-digest-2021.git`<br>

Change branch to `team#6` using `git checkout team#6`<br>

Change Directory to `api-digest-2021/team$6 - {2}`, using `cd "api-digest-2021/team#6 - {2}"`<br>

Install All the dependencies using `npm i`.<br>

Replace the token with your token in `routes/dashboard.js` at 22 line.<br>

Start the app using `nodemon index`

Now go to <a href="http://localhost:3000/">localhost:3000</a> and explore each and every feature of <b>E-Doctor</b>



