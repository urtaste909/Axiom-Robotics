# Axiom Robotics

<p align="center">
  <img src="media/banner.jpeg" alt="banner">
</p>

<p align="center">
  <strong>Autonomous Bipedal Robot Platform with Reinforcement Learning</strong>
</p>

<p align="center">
  <a href="https://discord.gg/UtJZsgfQGe">
    <img src="https://img.shields.io/badge/Discord-Join-7289da?style=flat-square&logo=discord" alt="Discord">
  </a>
  <img src="https://img.shields.io/badge/Python-3.9+-3776ab?style=flat-square&logo=python" alt="Python">
  <img src="https://img.shields.io/badge/MuJoCo-Simulation-00a0a0?style=flat-square" alt="MuJoCo">
  <img src="https://img.shields.io/badge/RL-PPO/SAC-ff6b6b?style=flat-square" alt="RL">
</p>

---

## Overview

Axiom Robotics is an open-source autonomous bipedal robot platform inspired by the iconic BDX droid from Disney. Standing at approximately 42 centimeters tall with legs extended, this project demonstrates the intersection of mechanical design, embedded systems, and reinforcement learning.

### Key Features

- **Autonomous Walking**: PPO/SAC-trained policies for stable bipedal locomotion
- **Sim-to-Real Transfer**: Physics-accurate MuJoCo simulation with real-world deployment
- **ESP32-C3 Control**: Low-latency embedded motor control
- **ONNX Policy Export**: Runtime-agnostic neural network inference
- **Expression System**: LED eyes, speaker, and microphone integration

---

## Visual Overview

<p align="center">
  <img src="media/strat.jpeg" alt="Axiom Robotics Bipedal" width="48%">
  <img src="media/srat1.jpeg" alt="Axiom Robotics Detailed" width="48%">
</p>

---

## Robot Specifications

| Parameter | Specification |
|-----------|---------------|
| Height | ~42 cm (legs extended) |
| DOF | 12 (6 per leg) |
| Actuators | Feetech STS/STSeries servos |
| Onboard Computer | Raspberry Pi Zero 2W |
| Microcontroller | ESP32-C3 |
| Total Cost | < $400 |

---

## Project Structure

```
Axiom-Robotics/
├── axiom_bdx/              # Robot CAD and URDF models
│   ├── cad/                # OnShape exports
│   ├── urdf/               # Robot description
│   └── meshes/             # STL/OBJ meshes
├── experiments/            # RL training and experiments
│   ├── mujoco/             # MuJoCo simulation environment
│   ├── RL/                 # Training scripts (PPO/SAC)
│   └── real_robot/          # Real-world testing
├── docs/                   # Documentation
│   ├── assembly_guide.md   # Assembly instructions
│   ├── print_guide.md      # 3D printing settings
│   └── sim2real.md         # Sim-to-real transfer guide
├── print/                  # 3D printable STL files
├── BEST_WALK_ONNX.onnx     # Pre-trained walking policy
└── BEST_WALK_ONNX_2.onnx   # Alternative walking policy
```

---

## Quick Start

### 1. Hardware Assembly

Follow the [Assembly Guide](docs/assembly_guide.md) for complete build instructions.

### 2. Software Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/Axiom-Robotics.git
cd Axiom-Robotics

# Install dependencies
pip install -e .
```

### 3. Run Pre-trained Policy

```bash
python experiments/mujoco/v2_rl_walk_mujoco.py --onnx_model_path BEST_WALK_ONNX_2.onnx
```

### 4. Train Your Own Policy

See [Sim-to-Real Guide](docs/sim2real.md) for training instructions.

---

## Reinforcement Learning

### Training Pipeline

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Reference  │────▶│   MuJoCo     │────▶│   ONNX      │
│   Motion    │     │  Simulation  │     │   Policy    │
└─────────────┘     └──────────────┘     └─────────────┘
                           │                    │
                           ▼                    ▼
                    ┌──────────────┐     ┌─────────────┐
                    │  PPO/SAC     │────▶│   ESP32-C3  │
                    │  Training    │     │   Control   │
                    └──────────────┘     └─────────────┘
```

### Supported Algorithms

- **PPO** (Proximal Policy Optimization)
- **SAC** (Soft Actor-Critic)

### Reward Design

Our multi-objective reward function balances locomotion quality, gait symmetry, thermal safety, and energy efficiency across walk and run modes. Trained with PPO in MuJoCo with 4096 parallel environments and domain randomization (mass ±10%, friction ±20%, servo delay ±5ms).

<p align="center">
  <img src="docs/figures/reward_design_table.png" alt="Reward Design Table" width="100%">
</p>

### Training Performance

Training reward components over 5B environment steps. Total reward converges as position tracking and velocity tracking improve, while energy penalty provides constant regularization critical for STS3215 servo longevity and 3S LiPo battery life.

<p align="center">
  <img src="docs/figures/training_performance.png" alt="Training Performance" width="100%">
</p>

### Thermal-Aware Control

The Feetech STS3215 servos generate significant heat during sustained walking, especially in hip actuators carrying the full upper-body load. With no active cooling on a sub-$400 platform, we incorporate servo temperature as a policy input and add thermal penalty rewards. The thermal-aware policy reduces torque² by ~49% at the cost of ~31% higher tracking error, keeping all servos safely below T_max = 80°C.

<p align="center">
  <img src="docs/figures/thermal_aware_rl.png" alt="Thermal-Aware RL Comparison" width="100%">
</p>

---

## Embedded Runtime

The onboard runtime handles:
- Motor control via ESP32-C3
- Neural network inference on Raspberry Pi Zero 2W
- Sensor data processing
- Communication with simulation

**Runtime Repository**: [Axiom Robotics Runtime](https://github.com/apirrone/Axiom_Robotics_Runtime)

---

## Documentation

| Document | Description |
|----------|-------------|
| [Assembly Guide](docs/assembly_guide.md) | Complete assembly instructions |
| [Print Guide](docs/print_guide.md) | 3D printing settings and STL files |
| [Motor Configuration](docs/configure_motors.md) | Feetech servo setup |
| [Sim-to-Real Guide](docs/sim2real.md) | Training and deployment pipeline |

---

## Bill of Materials

| Component | Quantity | Est. Cost |
|-----------|----------|-----------|
| Feetech STS3215 Servo | 12 | $180 |
| ESP32-C3 DevKit | 1 | $5 |
| Raspberry Pi Zero 2W | 1 | $25 |
| 3S LiPo Battery | 1 | $20 |
| Buck Converter | 2 | $10 |
| M3 Hardware | ~100 | $15 |
| 3D Printed Parts | - | ~$50 |

**Full BOM**: [Google Sheets](https://docs.google.com/spreadsheets/d/1gq4iWWHEJVgAA_eemkTEsshXqrYlFxXAPwO515KpCJc/edit)

---

## Sim-to-Real Progress

### Thermal Model Validation

We validate our first-order thermal actuator model (Ṫ = −α(T − T_ambient) + βτ²) against physical STS3215 hip servo thermistor measurements during 10-minute continuous walking tests. The MuJoCo simulation tracks ground truth with RMSE of 2.3°C, confirming reliable thermal prediction for policy deployment.

<p align="center">
  <img src="docs/figures/sim_to_real_transfer.png" alt="Sim-to-Real Temperature Validation" width="100%">
</p>


---

## Acknowledgments

Special thanks to:

- **HuggingFace** for sponsoring this project
- **Pollen Robotics** for open-source robotics tools
- **Rhoban** for actuator modeling tools

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

