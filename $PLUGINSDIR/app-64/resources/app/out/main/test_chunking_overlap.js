function getChunkBoundaries(duration, chunkDurationSec, overlapSec) {
  const stride = chunkDurationSec - overlapSec;
  const chunksCount = Math.ceil((duration - overlapSec) / stride);
  
  const boundaries = [];
  for (let i = 0; i < chunksCount; i++) {
    const startSec = i * stride;
    const chunkDur = Math.min(chunkDurationSec, duration - startSec);
    const startBoundary = i === 0 ? 0 : startSec + (overlapSec / 2);
    const endBoundary = i === chunksCount - 1 ? Infinity : (startSec + chunkDur) - (overlapSec / 2);
    
    boundaries.push({
      index: i,
      startSec,
      chunkDur,
      startBoundary,
      endBoundary
    });
  }
  return boundaries;
}

// Test cases
console.log("=== OVERLAP BOUNDARIES TEST ===");
const test1 = getChunkBoundaries(500, 180, 2);
console.log("Audio 500s (8.3m):", JSON.stringify(test1, null, 2));

// Let's verify that the boundaries are contiguous and do not overlap
for (let i = 0; i < test1.length - 1; i++) {
  const currentEnd = test1[i].endBoundary;
  const nextStart = test1[i+1].startBoundary;
  console.log(`Chunk ${i} ends at ${currentEnd}s. Chunk ${i+1} starts at ${nextStart}s.`);
  if (currentEnd !== nextStart) {
    console.error("✗ Error: boundaries are not contiguous!");
    process.exit(1);
  }
}
console.log("✓ Success: boundaries are perfectly contiguous!");
