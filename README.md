# ArmSentientRobot

**A quadruped robot platform with intelligent perception and adaptive locomotion.**

---

## System Architecture

The ArmSentientRobot implements a **four-layer hierarchical control architecture** combining cloud AI reasoning, reinforcement learning, real-time motor control, and physical hardware.

![System Architecture](imgs/layer-architecture.png)

### Control Loop Architecture

![Control Loop](imgs/control-loop.png)

### Full Pipeline Architecture

![Full Pipeline](imgs/full-pipeline.png)

### Layer Descriptions

| Layer | Technology | Function |
|-------|-----------|----------|
| **Cognitive** | Claude API (Cloud) | Mission planning, terrain analysis, NL commands |
| **Learning** | PPO/SAC (Edge/Sim) | Adaptive gait policies, sim-to-real transfer |
| **Control** | STM32F103C8 | IK solving, PID control, 50Hz servo loop |
| **Hardware** | Physical | 12× MG92R servos, LiPo power, 3D chassis |

---

## Hardware Architecture

![Hardware Architecture](imgs/hardware-architecture.png)

### Power System

![Power System](imgs/power-system.png)

### Control Loop Timing (50Hz)

![Control Timing](imgs/control-timing.png)

---

## Inverse Kinematics

![IK Solver](imgs/ik-solver.png)

### Joint Configuration

| Joint | Range | Control |
|-------|-------|---------|
| Coxa (hip) | ±45° | Rotation in XY plane |
| Femur (thigh) | -90° to +45° | Leg elevation |
| Tibia (shin) | -145° to +45° | Foot positioning |

### IK Equations

For each leg, given target foot position (x, y, z) relative to hip:

```c
// Femur angle (rotation in XY plane)
θ_femur = atan2(y, x)

// Tibia angle (lever arm)
L = sqrt(x² + y²)
L1 = sqrt((L - a)² + z²)
θ_tibia = atan2(z, L - a) - acos((b² + c² - L1²) / (2·b·c))

// Coxa angle (elevation)
θ_coxa = acos((b² + L1² - c²) / (2·b·L1))
θ_coxa = θ_tibia + θ_coxa
```

Where:
- `a` = Coxa length (35mm)
- `b` = Femur length (65mm)
- `c` = Tibia length (95mm)

---

## Gait Patterns

![Gait Patterns](imgs/gait-patterns.png)

### Gait Types

| Gait | Description | Speed | Stability |
|------|-------------|-------|-----------|
| **Trot** | Diagonal leg pairs move together | Fast | Medium |
| **Wave** | Sequential leg lifting | Slow | High |
| **Tripod** | 3 legs support, 3 moving | Balanced | Medium |
| **Crawl** | Continuous ground contact | Very Slow | Maximum |

---

## Training Progress

![Training Progress](imgs/training-progress.png)

### Sim-to-Real Transfer

![Sim-to-Real](imgs/sim-to-real.png)

---

## Reinforcement Learning

### Training Configuration

```python
PPO_CONFIG = {
    "learning_rate": 3e-4,
    "gamma": 0.99,
    "lam": 0.95,
    "clip_ratio": 0.2,
    "epochs": 10,
    "batch_size": 4096,
}

SAC_CONFIG = {
    "algorithm": "SAC",
    "learning_rate": 3e-4,
    "gamma": 0.99,
    "tau": 0.005,
    "alpha": 0.2,
}
```

### Reward Function

| Component | Weight | Description |
|-----------|--------|-------------|
| Forward Progress | +1.0 | X-velocity reward |
| Energy Efficiency | -1e-3 | Torque usage penalty |
| Stability | +0.5 | Height maintenance |
| Smoothness | -0.01 | Jerk minimization |

---

## System Specifications

### Hardware Components

| Component | Specification |
|-----------|---------------|
| **Main Controller** | STM32F103C8 (72MHz ARM Cortex-M3) |
| **Servo Driver** | PCA9685 (I2C) + MG92R high-torque servos |
| **IMU** | MPU6050 (6-axis accelerometer/gyroscope) |
| **Voice Module** | LD3320 + STC11L08XE (ASR) |
| **Communication** | USART2 (9600 8N1) / BLE (optional) |
| **DOF** | 12 joints (3 per leg × 4 legs) |
| **Power** | 5-6V external for servos, separate from MCU |

### Physical Dimensions

```
Robot Topology:
        Forward (X+)
              ↑
              │
    ┌─────────┼─────────┐
    │   RL    │   RR    │   ← Right side
    │  [L4]   │  [L3]   │
────┼─────────┼─────────┼─────▶ Left (Y+)
    │  [L1]   │  [L2]   │
    │   FL    │   FR    │   ← Left side
    └─────────┼─────────┘
              │
              ↓
           Origin
```

### Leg Kinematics

| Segment | Length | Mass |
|---------|--------|------|
| Coxa | 35mm | 30g |
| Femur | 65mm | 50g |
| Tibia | 95mm | 40g |

---

## Control Commands

The quadruped receives single-byte ASCII commands via **USART2** (9600 8N1):

| Command | Action | Gait |
|---------|--------|------|
| `0` | Stand / Stop | Return to current height |
| `1` | Walk Forward | Trot gait |
| `2` | Walk Backward | Trot gait |
| `3` | Turn Left | Trot gait |
| `4` | Turn Right | Trot gait |
| `5` | Strafe Left | Omnidirectional |
| `6` | Strafe Right | Omnidirectional |
| `7` | Low Posture | Decrease height |
| `8` | High Posture | Increase height |
| `9` | Crawl Gait | Wave gait |
| `a` | Pickup Sequence | Arm/gripper |
| `b` | LED Chase | Status animation |
| `c` | Handshake | Social gesture |
| `d` | Reset | Return to default |

**Protocol**: Frame format `[CMD]` — brackets are ignored, middle byte is executed.

---

## Project Structure

```
ArmSentientRobot/
├── Hardware/
│   ├── PCB/              # Circuit schematics (PDF)
│   └── STL/             # 3D printable models
│       ├── Body/        # Main chassis STLs
│       └── Arm/         # Gripper/arm STLs
│
├── arm_sentient_core/   # Main quadruped controller
│   ├── HARDWARE/        # Peripheral drivers
│   │   └── DOG/         # Quadruped kinematics (dog.c)
│   ├── USER/            # User application
│   └── OBJ/             # Compiled output (TIMER.hex)
│
├── voice_relay/         # Voice relay + LED indicator
│   └── OBJ/             # Compiled output
│
├── arm_control/         # Posture/key control
│   └── OBJ/             # Compiled output
│
├── voice_ld3320/        # LD3320 voice recognition
│   ├── keil4 APP/       # Keil C51 project
│   └── obj/             # V07A.hex
│
├── docs/
│   └── mujoco_urdf_spec.md       # RL training spec
│
├── imgs/
│   ├── architecture-layers.png   # 4-layer system
│   ├── layer-architecture.png    # Full layer view
│   ├── control-loop.png          # Control loop
│   ├── full-pipeline.png         # AI pipeline
│   ├── hardware-architecture.png  # Hardware block
│   ├── power-system.png          # Power diagram
│   ├── control-timing.png        # 50Hz timing
│   ├── ik-solver.png            # IK flow
│   ├── gait-patterns.png         # Gait types
│   ├── training-progress.png      # RL training
│   └── sim-to-real.png           # Sim-to-real
│
└── assets/
    └── Dog1.jpg         # Robot image
```

---

## Assembly Guide

### 3D Printing

1. **Body Parts** (`Hardware/STL/Body/`):
   - Main chassis: PLA+ recommended, 20% infill
   - Leg brackets: PLA, 15% infill

2. **Arm/Gripper** (`Hardware/STL/Arm/`):
   - Servo mounts: PLA, 20% infill
   - Gripper fingers: TPU for flexibility

### Calibration Steps

1. **Servo Center**: Set all servos to 1500μs (90°) before assembly
2. **Offset Calibration**: Adjust `datatemp[12]` in `dog.c`
3. **Height Tuning**: Modify `HIGH` parameter for desired standing height
4. **Gait Parameters**: Tune `Ts/Ts2`, `Bj/Bj2` for step cycle

---

## Building & Flashing

### Method A: Pre-built HEX (Recommended)

| Firmware | File | Target |
|----------|------|--------|
| Main Controller | `arm_sentient_core/OBJ/TIMER.hex` | STM32F103C8 |
| Voice Relay | `voice_relay/OBJ/Template.hex` | STM32F103ZE |
| Posture Control | `arm_control/OBJ/Template.hex` | STM32F103ZE |
| Voice Recognition | `voice_ld3320/obj/V07A.hex` | STC11L08XE |

### Method B: Build from Source

**STM32 Projects** (Keil MDK-ARM):
```bash
# Open project in Keil
# arm_sentient_core/USER/TIMER.uvprojx
# Build and flash via ST-LINK
```

**Voice Recognition** (Keil C51):
```bash
# Open: voice_ld3320/keil4 APP/YS-V0.7.uvproj
# Flash via STC ISP tool
```

---

## Power Requirements

⚠️ **Critical**: Use **separate power supplies** for servos and MCU.

| Component | Voltage | Current |
|-----------|---------|---------|
| STM32 MCU | 3.3V / 5V | < 100mA |
| 12× MG92R | 5-6V | Up to 5A peak |
| LD3320 | 3.3V | < 50mA |
| MPU6050 | 3.3V | < 5mA |

**Recommended**: MP1584 buck converter or dedicated 5V/6A supply for servos.

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes with clear messages
4. Push to branch and open Pull Request

---

## License

MIT License — See [LICENSE](LICENSE) file for details.

---

## Acknowledgments

Based on the open-source 12-DOF quadruped tutorial:
[bilibili.com/video/BV1Th411y7AT](https://www.bilibili.com/video/BV1Th411y7AT/)

---

*Bringing intelligent robotics to the desktop.*
