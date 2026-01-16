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
}


function sampleBalancedBlocks(trial_objects, blocks = 8, perSpeaker = 10) {
    // group by ID
    const byId = {};
    for (const t of trial_objects) {
        if (!byId[t.id]) byId[t.id] = [];
        byId[t.id].push(t);
    }

    const ids = Object.keys(byId);

    // total IDs must match blocks × perSpeaker
    if (ids.length !== blocks * perSpeaker) {
        throw new Error("ID count mismatch: need blocks * perSpeaker IDs.");
    }

    // --- Shuffle all IDs once ---
    for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
    }

    // --- Partition IDs into 8 blocks of 10 IDs each ---
    const idBlocks = [];
    for (let b = 0; b < blocks; b++) {
        idBlocks.push(ids.slice(b * perSpeaker, (b + 1) * perSpeaker));
    }

    // find speakers
    const speakers = [...new Set(trial_objects.map(o => o.speaker))];

    // --- Produce one sample per block ---
    const samples = []; // array of 8 samples

    for (let b = 0; b < blocks; b++) {
        const block = idBlocks[b];
        const sample = [];
        const speakerCounts = {};

        speakers.forEach(s => speakerCounts[s] = 0);

        // For each ID in this block
        for (const id of block) {
            const group = [...byId[id]].sort(() => Math.random() - 0.5);

            for (const item of group) {
                const s = item.speaker;

                if (speakerCounts[s] < perSpeaker) {
                    sample.push(item);
                    speakerCounts[s]++;
                    break; // do not reuse ID
                }
            }
        }

        samples.push(sample);
    }

    return samples;
}

function sampleBalancedBlocksPILOT(
    trial_objects,
    blocks = 6,
    speakersPerBlock = 12,
    totalIds = 288
) {
    // ---- group trials by sentence ID ----
    const byId = {};
    for (const t of trial_objects) {
        if (!byId[t.id]) byId[t.id] = [];
        byId[t.id].push(t);
    }

    const allIds = Object.keys(byId);

    if (allIds.length < totalIds) {
        throw new Error("Not enough sentence IDs to preselect from.");
    }

    // ---- randomly preselect 288 sentence IDs ----
    for (let i = allIds.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allIds[i], allIds[j]] = [allIds[j], allIds[i]];
    }

    const selectedIds = allIds.slice(0, totalIds);

    // ---- sanity check ----
    const idsPerBlock = speakersPerBlock; // 12
    if (selectedIds.length !== blocks * idsPerBlock) {
        throw new Error("ID count mismatch: need blocks × idsPerBlock.");
    }

    // ---- partition IDs into blocks ----
    const idBlocks = [];
    for (let b = 0; b < blocks; b++) {
        idBlocks.push(
            selectedIds.slice(
                b * idsPerBlock,
                (b + 1) * idsPerBlock
            )
        );
    }

    // ---- identify speakers ----
    const speakers = [...new Set(trial_objects.map(o => o.speaker))];
    if (speakers.length !== 4) {
        throw new Error("Expected exactly 4 speakers.");
    }

    // ---- sample trials ----
    const samples = [];

    for (let b = 0; b < blocks; b++) {
        const blockIds = idBlocks[b];
        const blockSample = [];
        const speakerCounts = {};

        speakers.forEach(s => speakerCounts[s] = 0);

        for (const id of blockIds) {
            // shuffle speaker realizations for this sentence
            const candidates = [...byId[id]].sort(() => Math.random() - 0.5);

            for (const item of candidates) {
                const s = item.speaker;

                if (speakerCounts[s] < speakersPerBlock) {
                    blockSample.push(item);
                    speakerCounts[s]++;
                    break; // one realization per sentence per block
                }
            }
        }

        // final safety check
        speakers.forEach(s => {
            if (speakerCounts[s] !== speakersPerBlock) {
                throw new Error(
                    `Speaker imbalance in block ${b}: ${s} has ${speakerCounts[s]}`
                );
            }
        });

        samples.push(blockSample);
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
