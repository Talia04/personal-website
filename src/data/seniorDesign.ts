export const seniorDesign = {
  title: "Q-Learning for Robotic Grid-World Navigation",
  subtitle: "From tabular learning to simulated robot control",
  summary:
    "A senior design research project exploring how classical Q-learning can navigate increasingly complex grid worlds and where tabular methods reach their limits.",
  techSummary:
    "I built a reinforcement-learning navigation system from the ground up: starting with small grid-world experiments, redesigning the state representation when the first approach broke, scaling the tests, and deploying the learned policy into a simulated robot.",
  techActions: [
    "Implemented the Q-learning training loop, reward shaping, exploration schedule, and grid-world evaluation tools in Python.",
    "Redesigned the agent state from absolute coordinates to a 4-tuple relative representation so the policy could generalize across randomized goals and obstacles.",
    "Mapped the learned grid policy into CoppeliaSim and used it to guide a Pioneer P3-DX robot around obstacles toward a goal.",
  ],
  question:
    "How far can an interpretable tabular reinforcement-learning policy scale before state-space growth makes a different approach necessary?",
  contribution:
    "I developed a 4-tuple relative state representation that encoded the goal and obstacle positions relative to the agent, which improved generalization across randomized layouts.",
  application:
    "I transferred the learned policy into CoppeliaSim to control a Pioneer P3-DX mobile robot in a physics-based environment.",
  metrics: [
    { value: "100 x 100", label: "largest grid explored" },
    { value: "4-tuple", label: "relative state encoding" },
    { value: "41 / 50", label: "100 x 100 test successes" },
    { value: "P3-DX", label: "simulated robot platform" },
  ],
  phases: [
    {
      number: "01",
      title: "Establish a baseline",
      description:
        "Validated classical Q-learning in a fixed 5 x 5 grid before introducing obstacles and randomized layouts.",
    },
    {
      number: "02",
      title: "Redesign the state",
      description:
        "Moved from absolute coordinates to a relative encoding after contradictory updates made randomized environments unstable.",
    },
    {
      number: "03",
      title: "Scale the experiment",
      description:
        "Added goal and obstacle awareness, reward shaping, and structured exploration while testing grids up to 100 x 100.",
    },
    {
      number: "04",
      title: "Transfer the policy",
      description:
        "Mapped grid cells into continuous coordinates and used the learned policy to guide a mobile robot in CoppeliaSim.",
    },
  ],
  findings: [
    "State representation can matter as much as the learning rule itself.",
    "Relative encodings generalize more effectively than absolute coordinates in changing environments.",
    "Tabular Q-learning remains interpretable, but sparse coverage becomes a hard constraint at larger scales.",
  ],
  future:
    "The next research direction is moving from Q-tables toward Deep Q-Networks, richer sensor inputs, and more scalable sampling strategies for larger or continuous environments.",
};
