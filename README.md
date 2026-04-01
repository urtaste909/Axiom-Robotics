<<<<<<< HEAD
# Agent Weaver

\
=======
# Olaf Robotics
das
>>>>>>> 105492324703b01d7c2c9728978b79364fdd1145
<p align="center">
  <img src="docs/logo.png" width="200" alt="Agent Weaver Logo">
</p>
<p align="center">
  <strong>Intelligent Agent Orchestration</strong>
</p>
![Agent Weaver Banner](media/p1.jpeg)

<table>
  <tr>
    <td> <img src="media/p2.jpeg" alt="2" width="300px" ></td>
    <td> <img src="media/p3.jpeg" alt="3" width="300px" ></td>
   </tr> 
</table>

**Agent Weaver** is an advanced AI orchestration framework dedicated to building and managing complex multi-agent systems. Our goal is to provide a robust, scalable, and highly expressive cognitive architecture based on the Agent Weaver platform, as detailed in the research paper "Agent Weaver: Intelligent Agent Orchestration in the Digital World".

# State of Orchestration

![Orchestration Demo](media/v1.gif)

<br>

<table>
  <tr>
    <td> <img src="media/p4.jpeg" alt="4" width="300px" ></td>
    <td> <img src="media/p5.jpeg" alt="5" width="300px" ></td>
   </tr> 
</table>
---

## 🌐 Multilingual Documentation / 文档 / Dokumentasi

- [English](#overview)
- [Bahasa Indonesia](#ringkasan)
- [中文 (Chinese)](#项目概述)

---

## Overview

Agent Weaver is an advanced AI orchestration framework dedicated to building and managing complex multi-agent systems. Based on the Agent Weaver architecture, it provides a robust, scalable, and highly expressive cognitive platform for research and development.

### 🏗️ Technical Architecture

Our architecture is built on a modular three-layer stack to ensure seamless execution:

![Technical Architecture](docs/architecture.png)

1.  **Simulation Layer (Mujoco & RL)**:
    *   High-fidelity physics simulation using **MuJoCo**.
    *   Reinforcement Learning (RL) policies trained for robust orchestration.
    *   Domain randomization for improved reliability.
2.  **Control Layer (Walk Engine & IK)**:
    *   **Inverse Kinematics (IK)** solver for precise positioning.
    *   Parametric node engine for stable graph generation.
    *   PID-based feedback loops for real-time error correction.
3.  **Hardware Layer (Embedded)**:
    *   **Raspberry Pi Zero 2W** as the primary compute unit.
    *   High-torque micro servos for joint actuation.
    *   IMU-based orientation sensing for stabilization.

### 🛠️ Advanced Features

*   **Polyglot Core Engine**: High-performance components implemented in **C++17**, **C**, and **Rust** for real-time control, low-level communication, and sensor processing.
*   **CI/CD Pipeline**: Automated build and test workflows using GitHub Actions to ensure code stability across multiple languages.
*   **Multilingual Support**: Comprehensive documentation in English, Indonesian, and Chinese.
*   **Modular Design**: Decoupled simulation and hardware layers for rapid prototyping.

---

## Ringkasan

Agent Weaver adalah kerangka kerja orkestrasi AI canggih yang didedikasikan untuk membangun dan mengelola sistem multi-agen yang kompleks. Berdasarkan arsitektur Agent Weaver, proyek ini menyediakan platform kognitif yang kuat, terukur, dan sangat ekspresif.

### 🏗️ Arsitektur Teknis

Arsitektur kami dibangun di atas tumpukan tiga lapis modular untuk memastikan eksekusi yang mulus:

1.  **Lapisan Simulasi (Mujoco & RL)**: Simulasi fisika fidelitas tinggi menggunakan MuJoCo dan kebijakan Reinforcement Learning untuk orkestrasi yang tangguh.
2.  **Lapisan Kontrol (Node Engine & IK)**: Solver Kinematika Invers (IK) untuk pemosisian yang presisi dan mesin grafik parametrik.
3.  **Lapisan Perangkat Keras (Embedded)**: Raspberry Pi Zero 2W sebagai unit komputasi utama dengan aktuasi servo mikro torsi tinggi.

---

## 项目概述

Agent Weaver 是一个致力于构建和管理复杂多智能体系统的高级 AI 编排框架。基于 Agent Weaver 架构，它提供了一个强大、可扩展且极具表现力的认知平台，供研究者和开发者使用。

### 🏗️ 技术架构

我们的架构基于模块化的三层堆栈构建，以确保无缝执行：

1.  **仿真层 (Mujoco & RL)**：使用 MuJoCo 进行高保真物理仿真，并训练强化学习 (RL) 策略以实现稳健的编排。
2.  **控制层 (Node Engine & IK)**：用于精确定位的反向运动学 (IK) 求解器和参数化图形引擎。
3.  **硬件层 (嵌入式)**：以 Raspberry Pi Zero 2W 为核心计算单元，配合高扭矩微型舵机进行关节驱动。

---

## Getting Started

### Hardware Assembly
Detailed assembly instructions can be found in the [Assembly Guide](docs/assembly_guide.md).

### Software Installation
To install the core library and dependencies:
```bash
pip install -e .
```

### Simulation
We use Mujoco for simulation. You can find the descriptions and simulation scripts in the `agent_weaver/tests` and `experiments` directories.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Project Goal: Intelligent Agent Orchestration in the Digital World.*
