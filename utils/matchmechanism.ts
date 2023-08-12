// Function to calculate the sum of square roots for each project
const calculateSqrtSum = (project) => {
  let sqrtSum = 0;
  for (let vote in project) {
    sqrtSum += Math.sqrt(parseFloat(project[vote]));
  }
  return parseFloat(sqrtSum.toFixed(2));
};

// Function to square the sum of square roots for each project and then calculate the matching amount
const calculateMatching = (projects, grantspool) => {
  let totalSqrtSumSquared = 0;

  // Calculate the square of the sum of square roots for each project
  for (let projectName in projects) {
    const project = projects[projectName];
    const sqrtSum = calculateSqrtSum(project);
    project.sqrtSum = sqrtSum;
    project.sqrtSumSquared = parseFloat((sqrtSum * sqrtSum).toFixed(2));
    totalSqrtSumSquared += project.sqrtSumSquared;
  }

  // Calculate the matching amount for each project based on the grantspool
  const factor = grantspool / totalSqrtSumSquared;
  for (let projectName in projects) {
    const project = projects[projectName];
    project.matchingAmount = parseFloat(
      (factor * project.sqrtSumSquared).toFixed(2)
    );
  }

  return projects;
};

export default calculateMatching;
