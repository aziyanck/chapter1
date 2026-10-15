# 4. Fading in the Mobile Environment

## 1. Definition of Fading

**Fading is the variation in the strength of a received signal over time, distance or frequency in a wireless communication system.**

It occurs due to obstacles, movement of mobile devices and multipath propagation.

**Example:** While talking on a mobile phone, the signal may become weak when you move behind a building.

## 2. Causes of Fading

1. **Multipath Propagation:** Signals reach the receiver through different paths due to reflection, diffraction and scattering.
2. **Movement of Mobile Devices:** Movement changes the signal paths and their relative phases.
3. **Obstacles:** Buildings, trees and hills can block or weaken signals.
4. **Atmospheric Conditions:** Changes in the environment can affect radio-wave propagation.
5. **Interference:** Multiple signal components may combine and strengthen or weaken the received signal.

## 3. Multipath Propagation

**Definition:** Multipath propagation occurs when a transmitted signal reaches the receiver through multiple paths.

The signals may arrive at different times and with different phases.

- **Constructive interference:** Signals combine and strengthen the received signal.
- **Destructive interference:** Signals combine and weaken the received signal.

Multipath propagation is a major cause of fading in mobile communication.

## 4. Path Loss

**Definition:** Path loss is the reduction in signal power as the distance between the transmitter and receiver increases.

**Example:** A mobile phone generally receives a weaker signal when it moves farther away from a cell tower, assuming other conditions remain comparable.

**Important difference:** Path loss describes the overall reduction in signal power with distance, whereas fading describes signal variations around the expected signal level.

## 5. Shadowing

**Definition:** Shadowing occurs when obstacles such as buildings, hills or trees obstruct radio waves and cause variations in the received signal strength.

**Example:** A mobile signal becomes weaker when a user enters a building.

Shadowing is also called *shadow fading*.

## 6. Doppler Effect and Doppler Shift

**Definition:** The Doppler effect is the change in the observed frequency of a signal due to relative movement between the transmitter and receiver.

**Doppler shift formula:**

\[
f_d=\frac{v}{\lambda}\cos\theta
\]

Where:
- \(f_d\) = Doppler frequency shift.
- \(v\) = relative speed.
- \(\lambda\) = wavelength.
- \(\theta\) = angle between the direction of motion and the direction of wave arrival, using the corresponding sign convention.

**Example:** When a person moves while using a mobile phone, the received radio signal may experience a frequency shift.

Greater movement speed generally produces a larger maximum Doppler shift.

---

## 7. Types of Fading

### A. Large-Scale Fading

Large-scale fading describes variations in the average received signal power over relatively large distances.

It includes:

- **Path loss:** Signal power decreases with distance.
- **Shadow fading:** Obstacles cause variations in the average signal strength.

### B. Small-Scale Fading

Small-scale fading describes rapid variations in the received signal strength over short distances or periods.

It commonly results from multipath propagation and movement.

### C. Fast Fading

**Definition:** Fast fading occurs when the received signal changes rapidly over a short period.

**Cause:** Rapid changes in the signal paths and relative phases, often associated with movement and Doppler effects.

**Example:** A moving mobile user experiences rapid signal fluctuations.

### D. Slow Fading

**Definition:** Slow fading occurs when the received signal changes more gradually over time.

**Cause:** Changes in shadowing and the surrounding environment.

**Example:** A mobile user gradually moving behind a large building experiences a change in signal strength.

### E. Flat Fading

**Definition:** Flat fading occurs when approximately the same attenuation affects all frequency components of the transmitted signal.

It occurs when the signal bandwidth is sufficiently smaller than the channel's coherence bandwidth.

### F. Frequency-Selective Fading

**Definition:** Frequency-selective fading occurs when different frequency components of a signal experience different amounts of attenuation.

It is commonly associated with multipath propagation and significant delay spread.

### G. Rayleigh Fading

**Definition:** Rayleigh fading is a statistical model used to describe multipath fading when there is no dominant direct line-of-sight component.

**Example:** Mobile communication in an urban environment where buildings obstruct the direct path.

### H. Rician Fading

**Definition:** Rician fading is a statistical model used when a dominant signal component, often a direct line-of-sight signal, exists alongside scattered multipath components.

**Example:** A wireless link with a clear direct path and additional reflected signals.

---

## 8. Effects of Fading

- Reduces received signal strength.
- Increases the probability of transmission errors.
- Can cause dropped calls.
- Reduces communication reliability.
- May decrease data transmission speed.

## 9. Techniques to Reduce Fading

1. **Diversity Techniques:** Use multiple independently fading signal paths to improve reception.
2. **Equalization:** Reduces signal distortion caused by multipath propagation.
3. **Error-Control Coding:** Adds redundancy to help detect or correct transmission errors.
4. **Adaptive Modulation:** Adjusts the modulation scheme according to channel conditions.
5. **Proper Antenna Placement:** Can reduce obstruction and improve reception.

### Types of Diversity

- **Space diversity:** Uses multiple antennas at different locations.
- **Frequency diversity:** Uses different frequencies.
- **Time diversity:** Transmits information at different times or uses coding and interleaving across time.

---