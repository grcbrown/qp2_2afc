function create_tv_array(json_object) {
    let tv_array = [];
    for (let i = 0; i < json_object.length; i++) {
        obj = {};
        obj.stimulus = json_object[i].stimulus;
        obj.id = json_object[i].id;
        obj.speaker = json_object[i].speaker;
        obj.data = {};
        tv_array.push(obj)
    }
    return tv_array;
};


function sampleBalancedBlocksOLD(trial_objects, blocks = 8, perSpeaker = 10) {
    // ---- group by sentence ID ----
    const byId = {};
    for (const t of trial_objects) {
        if (!byId[t.id]) byId[t.id] = [];
        byId[t.id].push(t);
    }

    const ids = Object.keys(byId);

    // ---- sanity check ----
    if (ids.length !== blocks * perSpeaker) {
        throw new Error("ID count mismatch: need blocks * perSpeaker IDs.");
    }

    // ---- shuffle IDs ----
    for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
    }

    // ---- partition IDs into blocks ----
    const idBlocks = [];
    for (let b = 0; b < blocks; b++) {
        idBlocks.push(
            ids.slice(b * perSpeaker, (b + 1) * perSpeaker)
        );
    }

    // ---- build samples ----
    const samples = [];

    for (let b = 0; b < blocks; b++) {
        const sample = [];

        for (const id of idBlocks[b]) {
            // add ALL speakers for this sentence
            const group = [...byId[id]].sort(() => Math.random() - 0.5);
            sample.push(...group);
        }

        samples.push(sample);
    }

    return samples;
}

function sampleBalancedBlocks(
    trial_objects,
    blocks = 8,
    perSpeaker = 10
) {
    // ---- group trials by sentence ID ----
    const byId = {};
    for (const t of trial_objects) {
        if (!byId[t.id]) byId[t.id] = [];
        byId[t.id].push(t);
    }

    const allIds = Object.keys(byId);

    // ---- identify speakers ----
    const speakers = [...new Set(trial_objects.map(o => o.speaker))];
    if (speakers.length !== 4) {
        throw new Error("Expected exactly 4 speakers.");
    }

    // ---- sanity check: every sentence has all speakers ----
    for (const id of allIds) {
        if (byId[id].length !== speakers.length) {
            throw new Error(`Sentence ${id} does not have all speakers.`);
        }
    }

    const samples = [];

    for (let b = 0; b < blocks; b++) {
        // ---- shuffle sentence IDs ----
        const ids = [...allIds];
        for (let i = ids.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ids[i], ids[j]] = [ids[j], ids[i]];
        }

        // ---- select 40 unique sentences for this block ----
        const blockIds = ids.slice(0, perSpeaker * speakers.length);

        // ---- shuffle again before speaker assignment ----
        for (let i = blockIds.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [blockIds[i], blockIds[j]] = [blockIds[j], blockIds[i]];
        }

        const sample = [];

        // ---- assign 10 unique sentences to each speaker ----
        speakers.forEach((speaker, sIdx) => {
            const speakerIds = blockIds.slice(
                sIdx * perSpeaker,
                (sIdx + 1) * perSpeaker
            );

            speakerIds.forEach(id => {
                const clip = byId[id].find(t => t.speaker === speaker);
                sample.push(clip);
            });
        });

        // ---- safety checks ----
        const idsInBlock = new Set(sample.map(t => t.id));
        if (idsInBlock.size !== perSpeaker * speakers.length) {
            throw new Error(`Sentence repeated in block ${b}`);
        }

        const speakerCounts = {};
        sample.forEach(t => {
            speakerCounts[t.speaker] = (speakerCounts[t.speaker] || 0) + 1;
        });

        console.log(`Block ${b}`, speakerCounts);

        speakers.forEach(s => {
            if (speakerCounts[s] !== perSpeaker) {
                throw new Error(`Speaker imbalance in block ${b}`);
            }
        });

        samples.push(sample);
    }

    return samples;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
