<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Exam Time Manager</h3>

  <p align="center">
    Efficiently manages classroom time, exams, and study details on screens.
    <br />
    <br />
    <a href="https://clock.salmero.fr">View Demo</a>
    ·
    <a href="https://github.com/awell00/exam_time_manager/issues">Report Bug</a>
    ·
    <a href="https://github.com/awell00/exam_time_manager/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
[![Interface-1][interface-1-screenshot]]()
<!-- [![Interface-2][interface-2-screenshot]]() -->

The Exam Time Management App is a powerful tool designed to streamline the management of exam timings and classroom schedules. It is specifically developed to display exam timings and study details on large screens, providing a comprehensive solution for educational institutions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![TS][TS.com]][TS-url]
* [![Node][Node.com]][Node-url]
* [![Express][Express.com]][Express-url]
* [![MongoDB][MongoDB.com]][MongoDB-url]
* [![Vite][Vite.com]][Vite-url]
* [![Socket][Socket.com]][Socket-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

1. **Install Node.js LTS:**
   - Download Node.js version 20.10.0 from the official website: [NODEJS Downloads](https://nodejs.org/en)
   
   **(LINUX) Install Node.js:**
   - On Ubuntu 22.04, use the following command:
     ```sh
     sudo apt install nodejs
     ```

2. **Install Git:**
   - Download and install Git from the official website: [Git Downloads](https://git-scm.com/downloads)

3. **Install Visual Studio Code:**
   - Install the Visual Studio Code redistributables. You can find them on the Microsoft website or use the following links:
     - [Visual Studio Code](https://code.visualstudio.com)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/awell00/exam_time_manager.git
   ```

2. **Navigate to the backend and frontend folders:**
   ```sh
   cd backend
   ```
   ```sh
   cd frontend
   ```

3. **Install npm or pnpm packages:**
   For Backend:
   ```sh
   npm install
   ```
   or
   ```sh
   pnpm install
   ```

4. **Run the frontend with Vite and also backend:**
   ```sh
   npm run dev
   ```
   or
   ```sh
   pnpm dev
   ```
   
5. **Build the project:**
   For Backend and backend:
   ```sh
   npm run build
   ```
   or
   ```sh
   pnpm build
   ```

6. **Run with Docker:**
   - Build Docker image:
     ```sh
     docker build -t exam_time_manager .
     ```
   - Run Docker container:
     ```sh
     docker run -p 4000:4000 -d exam_time_manager
     ```
   
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

### EXAM TIME MANAGER
1. Choose the desired examination room.
2. Indicate the new subject by providing its name, duration, and the commencement time along with the class number.
3. Initiate the exam by selecting the "add" button.
4. Conclude the exam by clicking on the "stop" button when finished.
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

### Resolve Issue
- [ ] Enhance mobile user interfaces across all components.
- [ ] Incorporate features related to classroom creation and exam addition processes.
- [ ] Enhance both design and code elements for overall improvement.

See the [open issues](https://github.com/awell00/exam_time_manager/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the Apache v2 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@AwellTv](https://twitter.com/AwellTv) - awellpro@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/awell00/exam_time_manager.svg?style=for-the-badge
[contributors-url]: https://github.com/awell00/exam_time_manager/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/awell00/exam_time_manager.svg?style=for-the-badge
[forks-url]: https://github.com/awell00/exam_time_manager/network/members
[stars-shield]: https://img.shields.io/github/stars/awell00/exam_time_manager.svg?style=for-the-badge
[stars-url]: https://github.com/awell00/exam_time_manager/stargazers
[issues-shield]: https://img.shields.io/github/issues/awell00/exam_time_manager.svg?style=for-the-badge
[issues-url]: https://github.com/awell00/exam_time_manager/issues
[license-shield]: https://img.shields.io/github/license/awell00/exam_time_manager.svg?style=for-the-badge
[license-url]: https://github.com/awell00/exam_time_manager/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/auxane-salmero/
[interface-1-screenshot]: https://images.salmero.fr/images/interface-1.png
[interface-2-screenshot]: https://salmero.fr/images/
[TS.com]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TS-url]: https://www.typescriptlang.org
[Node.com]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[Express.com]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com
[MongoDB.com]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com
[Vite.com]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev
[Socket.com]: https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101
[Socket-url]: https://socket.io
