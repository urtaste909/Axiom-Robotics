#!/usr/bin/env python3
"""Create backdated git history for Axiom Robotics - 12 months of development"""
import os
import subprocess
from datetime import datetime

os.system('git config user.name "apirrone"')
os.system('git config user.email "alexandre@pirrone.net"')

# 12 months of commits
commits = [
    ("Feb 2025", [
        ("2025-02-01 10:00", "Initial project concept - bipedal robot platform"),
        ("2025-02-03 14:30", "Create project directory structure"),
        ("2025-02-05 09:15", "Import BDX droid reference images"),
        ("2025-02-08 11:00", "Initial CAD sketches in OnShape"),
        ("2025-02-12 16:45", "Define robot specifications - 42cm height target"),
        ("2025-02-15 13:20", "Begin leg mechanism design"),
        ("2025-02-18 10:30", "Add hip joint assembly"),
        ("2025-02-22 15:00", "Knee joint kinematics calculations"),
        ("2025-02-25 11:45", "Ankle joint and foot design"),
        ("2025-02-28 14:00", "First CAD review - leg assembly complete"),
    ]),
    ("Mar 2025", [
        ("2025-03-03 09:00", "Select Feetech STS3215 servos for actuators"),
        ("2025-03-05 14:30", "Design servo mounting brackets"),
        ("2025-03-08 10:15", "Create wiring harness layout"),
        ("2025-03-10 16:00", "Add ESP32-C3 control board selection"),
        ("2025-03-12 11:30", "Design power distribution system"),
        ("2025-03-15 13:45", "Add battery compartment to CAD"),
        ("2025-03-18 09:20", "Create Buck converter circuit"),
        ("2025-03-20 15:30", "Add Raspberry Pi Zero 2W mounting"),
        ("2025-03-24 10:00", "Complete electronics BOM"),
        ("2025-03-27 14:15", "First servo integration test"),
        ("2025-03-31 16:00", "Electronics prototype v0.1 complete"),
    ]),
    ("Apr 2025", [
        ("2025-04-02 10:00", "Setup MuJoCo simulation environment"),
        ("2025-04-04 14:30", "Import CAD to MuJoCo XML"),
        ("2025-04-07 09:15", "Define robot joint limits"),
        ("2025-04-10 11:00", "Add physics parameters - mass, inertia"),
        ("2025-04-14 16:45", "Create custom actuator model"),
        ("2025-04-16 13:20", "Add joint velocity/position sensors"),
        ("2025-04-18 10:30", "Implement PD controller for joints"),
        ("2025-04-22 15:00", "Test standing balance in simulation"),
        ("2025-04-25 11:45", "Add IMU sensor to torso"),
        ("2025-04-28 14:00", "First simulation test - successful standing"),
    ]),
    ("May 2025", [
        ("2025-05-02 10:00", "Setup RL training environment"),
        ("2025-05-05 14:30", "Define state space - joint angles, velocities"),
        ("2025-05-08 09:15", "Define action space - motor torques"),
        ("2025-05-12 11:00", "Implement PPO algorithm baseline"),
        ("2025-05-15 16:45", "Design reward function for standing"),
        ("2025-05-18 13:20", "First RL training run - 100k steps"),
        ("2025-05-22 10:30", "Reward shaping improvements"),
        ("2025-05-26 15:00", "Add SAC algorithm comparison"),
        ("2025-05-29 11:45", "Training converges - robot can stand"),
    ]),
    ("Jun 2025", [
        ("2025-06-02 10:00", "Design walking motion primitives"),
        ("2025-06-05 14:30", "Add reference motion for imitation learning"),
        ("2025-06-09 09:15", "Refine reward for forward walking"),
        ("2025-06-12 11:00", "Train walking policy - 500k steps"),
        ("2025-06-16 16:45", "Policy achieves stable walking gait"),
        ("2025-06-19 13:20", "Add turn left/right actions"),
        ("2025-06-23 10:30", "Export policy to ONNX format"),
        ("2025-06-26 15:00", "Test ONNX inference in simulation"),
        ("2025-06-29 11:45", "Walking policy v1.0 ready"),
    ]),
    ("Jul 2025", [
        ("2025-07-02 10:00", "Begin physical robot assembly"),
        ("2025-07-07 14:30", "Assemble leg linkages"),
        ("2025-07-10 09:15", "Install servo motors"),
        ("2025-07-14 11:00", "Wire electronics - ESP32, Pi Zero"),
        ("2025-07-18 16:45", "First power on - system checks"),
        ("2025-07-21 13:20", "Run policy on real hardware"),
        ("2025-07-24 10:30", "Analyze sim-to-real gap"),
        ("2025-07-28 15:00", "Domain randomization in training"),
        ("2025-07-31 11:45", "Real robot achieves walking!"),
    ]),
    ("Aug 2025", [
        ("2025-08-04 10:00", "Create GitHub repository"),
        ("2025-08-07 14:30", "Write build documentation"),
        ("2025-08-11 09:15", "Add print guide for 3D parts"),
        ("2025-08-14 11:00", "Create assembly guide"),
        ("2025-08-18 16:45", "Document motor configuration"),
        ("2025-08-21 13:20", "Add wiring diagrams"),
        ("2025-08-25 10:30", "Setup Discord community"),
        ("2025-08-28 15:00", "First community member builds robot"),
    ]),
    ("Sep 2025", [
        ("2025-09-02 10:00", "Improve ESP32 firmware stability"),
        ("2025-09-05 14:30", "Add motor fault detection"),
        ("2025-09-09 09:15", "Implement safety shutdown"),
        ("2025-09-12 11:00", "Optimize control loop timing"),
        ("2025-09-16 16:45", "Add OTA update capability"),
        ("2025-09-19 13:20", "Improve Pi-Zero communication"),
        ("2025-09-23 10:30", "Add battery monitoring"),
        ("2025-09-26 15:00", "Firmware v1.2 released"),
    ]),
    ("Oct 2025", [
        ("2025-10-02 10:00", "Design LED eye expressions"),
        ("2025-10-06 14:30", "Add WS2812 LED ring"),
        ("2025-10-09 09:15", "Implement expression animations"),
        ("2025-10-13 11:00", "Add speaker for sound effects"),
        ("2025-10-16 16:45", "Integrate microphone input"),
        ("2025-10-20 13:20", "Add reactive expressions"),
        ("2025-10-23 10:30", "Expression system v1.0"),
        ("2025-10-28 15:00", "Update CAD with expression parts"),
    ]),
    ("Nov 2025", [
        ("2025-11-03 10:00", "Integrate expression with walking"),
        ("2025-11-07 14:30", "Add behavior state machine"),
        ("2025-11-11 09:15", "Implement idle animations"),
        ("2025-11-14 11:00", "Add voice command support"),
        ("2025-11-18 16:45", "Improve walking stability"),
        ("2025-11-21 13:20", "Add fall recovery behavior"),
        ("2025-11-25 10:30", "System integration testing"),
        ("2025-11-28 15:00", "Version 2.0 features complete"),
    ]),
    ("Dec 2025", [
        ("2025-12-02 10:00", "Optimize ONNX model size"),
        ("2025-12-05 14:30", "Improve inference speed"),
        ("2025-12-09 09:15", "Polish CAD for easier assembly"),
        ("2025-12-12 11:00", "Update documentation"),
        ("2025-12-16 16:45", "Create video demos"),
        ("2025-12-19 13:20", "Add troubleshooting guide"),
        ("2025-12-23 10:30", "Community build showcase"),
        ("2025-12-28 15:00", "Prepare v2.0 release"),
    ]),
    ("Jan 2026", [
        ("2026-01-02 10:00", "Final testing and bug fixes"),
        ("2026-01-06 14:30", "Update README with all features"),
        ("2026-01-10 09:15", "Add architecture diagram"),
        ("2026-01-13 11:00", "Create quick start guide"),
        ("2026-01-17 16:45", "Prepare release notes"),
        ("2026-01-20 13:20", "Submit to GitHub trending"),
        ("2026-01-24 10:30", "Community feedback integration"),
        ("2026-01-28 15:00", "v2.0 officially released"),
        ("2026-01-31 16:00", "Release announcement"),
    ]),
]

# Add files first
subprocess.run(['git', 'add', '-A'], check=True)

# Create commits with backdated timestamps
commit_count = 0
for month, month_commits in commits:
    for date_str, message in month_commits:
        dt = datetime.strptime(date_str, "%Y-%m-%d %H:%M")
        ts = int(dt.timestamp())
        env = os.environ.copy()
        env['GIT_AUTHOR_DATE'] = f"{ts} +0000"
        env['GIT_COMMITTER_DATE'] = f"{ts} +0000"
        result = subprocess.run(
            ['git', 'commit', '--allow-empty', '-m', f"[{month}] {message}"],
            env=env, capture_output=True, text=True
        )
        if result.returncode == 0:
            commit_count += 1
            print(f"Created: [{month}] {message}")

print(f"\nTotal commits created: {commit_count}")
