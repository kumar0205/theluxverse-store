const fs = require('fs');
const readline = require('readline');

async function processTranscript() {
  const transcriptPath = '/home/rgukt123/.gemini/antigravity-ide/brain/24f677d6-1722-4790-97b9-0c9ac5ec1611/.system_generated/logs/transcript.jsonl';
  let content = "";
  
  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
  
  for await (const line of rl) {
    try {
      const data = JSON.parse(line);
      if (data.type === 'PLANNER_RESPONSE' && data.tool_calls) {
        for (const tc of data.tool_calls) {
          if (tc.name === 'write_to_file' && tc.args.TargetFile && tc.args.TargetFile.includes('Launchpad.jsx')) {
            content = tc.args.CodeContent;
          } else if (tc.name === 'replace_file_content' && tc.args.TargetFile && tc.args.TargetFile.includes('Launchpad.jsx')) {
            // Very naive replacement
            const target = tc.args.TargetContent;
            const replacement = tc.args.ReplacementContent;
            if (content.includes(target)) {
              content = content.replace(target, replacement);
            } else {
              // try to find by lines or just ignore if it's too hard
            }
          } else if (tc.name === 'multi_replace_file_content' && tc.args.TargetFile && tc.args.TargetFile.includes('Launchpad.jsx')) {
            for (const chunk of tc.args.ReplacementChunks) {
              const target = chunk.TargetContent;
              const replacement = chunk.ReplacementContent;
              if (content.includes(target)) {
                content = content.replace(target, replacement);
              }
            }
          }
        }
      }
    } catch(e) {}
  }
  
  fs.writeFileSync('RecoveredLaunchpad.jsx', content);
  console.log("Recovered size:", content.length);
}

processTranscript();
