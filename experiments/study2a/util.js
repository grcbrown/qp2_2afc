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

function DEMOsampleBalancedBlocks(trial_objects, blocks = 8, perSpeaker = 2) {
    // --- Group by speaker ---
    const bySpeaker = {};
    for (const t of trial_objects) {
        if (!bySpeaker[t.speaker]) bySpeaker[t.speaker] = [];
        bySpeaker[t.speaker].push(t);
    }

    const speakers = Object.keys(bySpeaker).map(Number);
    const samples = [];

    for (let b = 0; b < blocks; b++) {
        const blockSample = [];

        for (const spk of speakers) {
            // Shuffle speaker's items
            const shuffled = [...bySpeaker[spk]].sort(() => Math.random() - 0.5);

            // Pick items with unique IDs
            const selected = [];
            const seenIds = new Set();

            for (const item of shuffled) {
                if (!seenIds.has(item.id)) {
                    selected.push(item);
                    seenIds.add(item.id);
                }
                if (selected.length === perSpeaker) break;
            }

            if (selected.length < perSpeaker) {
                throw new Error(`Not enough unique items for speaker ${spk}`);
            }

            blockSample.push(...selected);
        }

        samples.push(blockSample);
    }

    return samples;
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
