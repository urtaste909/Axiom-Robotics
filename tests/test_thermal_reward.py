"""
Tests for thermal_penalty_reward and gait_symmetry_reward functions.

Derived from principles in Open_Duck_Mini by apirrone.
MIT License - https://github.com/apirrone/Open_Duck_Mini
"""

import numpy as np
import pytest


class MockData:
    """Mock data object to simulate MuJoCo environment data."""
    def __init__(self):
        self.qpos = np.zeros(22)
        self.qvel = np.zeros(21)
        self.ctrl = np.zeros(15)


class MockModel:
    """Mock model object for testing."""
    pass


class MockEnv:
    """Mock environment with reward functions for testing."""
    def __init__(self):
        self.data = MockData()

    def thermal_penalty_reward(self):
        """
        Penalizes high joint temperatures to protect servo motors.
        Simulates thermal buildup based on joint velocities.
        """
        joint_velocities = np.abs(self.data.qvel[6:6 + 13])
        thermal_factor = 0.01
        penalty = -thermal_factor * np.sum(np.square(joint_velocities))
        return penalty

    def gait_symmetry_reward(self):
        """
        Rewards symmetric gait patterns between left and right legs.
        """
        right_leg = self.data.qpos[7:7 + 6]
        left_leg = self.data.qpos[13:13 + 6]
        symmetry_penalty = -np.sum(np.square(right_leg - np.flip(left_leg)))
        return symmetry_penalty * 0.05


@pytest.fixture
def mock_env():
    """Create a mock environment for testing."""
    return MockEnv()


class TestThermalPenaltyReward:
    """Test suite for thermal_penalty_reward function."""

    def test_zero_velocity_gives_zero_penalty(self, mock_env):
        """When all joint velocities are zero, penalty should be zero."""
        mock_env.data.qvel = np.zeros(21)
        reward = mock_env.thermal_penalty_reward()
        assert reward == 0.0

    def test_nonzero_velocity_gives_negative_penalty(self, mock_env):
        """Non-zero joint velocities should produce negative penalty."""
        mock_env.data.qvel[6] = 1.0
        reward = mock_env.thermal_penalty_reward()
        assert reward < 0.0

    def test_higher_velocity_gives_larger_penalty(self, mock_env):
        """Higher velocities should produce larger penalties."""
        mock_env.data.qvel[6] = 1.0
        low_vel_reward = mock_env.thermal_penalty_reward()

        mock_env.data.qvel[6] = 5.0
        high_vel_reward = mock_env.thermal_penalty_reward()

        assert high_vel_reward < low_vel_reward

    def test_penalty_is_quadratic_with_velocity(self, mock_env):
        """Penalty should scale quadratically with velocity."""
        mock_env.data.qvel[6] = 2.0
        double_vel_reward = mock_env.thermal_penalty_reward()

        mock_env.data.qvel[6] = 1.0
        single_vel_reward = mock_env.thermal_penalty_reward()

        # Quadratic scaling means 2x velocity = 4x penalty magnitude
        assert abs(double_vel_reward) == pytest.approx(4 * abs(single_vel_reward), rel=0.001)


class TestGaitSymmetryReward:
    """Test suite for gait_symmetry_reward function."""

    def test_perfect_symmetry_gives_zero_penalty(self, mock_env):
        """Perfectly symmetric legs should give zero penalty."""
        # Set symmetric leg positions
        mock_env.data.qpos[7:13] = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6]
        mock_env.data.qpos[13:19] = [0.6, 0.5, 0.4, 0.3, 0.2, 0.1]  # Mirrored

        reward = mock_env.gait_symmetry_reward()
        assert reward == pytest.approx(0.0, abs=1e-6)

    def test_asymmetry_gives_negative_reward(self, mock_env):
        """Asymmetric leg positions should give negative reward."""
        mock_env.data.qpos[7:13] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        mock_env.data.qpos[13:19] = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0]

        reward = mock_env.gait_symmetry_reward()
        assert reward < 0.0

    def test_larger_asymmetry_gives_more_negative_reward(self, mock_env):
        """Larger asymmetry should produce more negative rewards."""
        mock_env.data.qpos[7:13] = [0.0] * 6
        mock_env.data.qpos[13:19] = [0.5] * 6
        small_asym_reward = mock_env.gait_symmetry_reward()

        mock_env.data.qpos[7:13] = [0.0] * 6
        mock_env.data.qpos[13:19] = [1.0] * 6
        large_asym_reward = mock_env.gait_symmetry_reward()

        assert large_asym_reward < small_asym_reward


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
