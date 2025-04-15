 
parseSheetMusic(input) {
    const lines = input.split('\n');
    let output = '';
    let currentLyrics = [];
    let currentMusicLine = null;

    lines.forEach(line => {
        if (line.startsWith('C:')) {
            currentLyrics = line.substring(2).trim().split('');
        } else if (line.startsWith('Q:')) {
            currentMusicLine = this.parseMusicLineToElements(line.substring(2).trim());
            output += this.createPairedLines(currentMusicLine, currentLyrics);
            currentLyrics = [];
        } else if (line.startsWith('V:')) {
            output += `<div class="version-info">版本: ${line.substring(2).trim()}</div>`;
        } else {
            output += `<div class="other-line">${line}</div>`;
        }
    });

    return output;
}

parseMusicLineToElements(line) {
    let elements = [];
    let currentElement = '';
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === ' ' && currentElement) {
            elements.push(this.formatNote(currentElement));
            currentElement = '';
        } else if (char === '"') {
            const chordEnd = line.indexOf('"', i + 1);
            if (chordEnd !== -1) {
                const chord = line.substring(i + 1, chordEnd);
                currentElement += `"${chord}"`;
                i = chordEnd;
            }
        } else {
            currentElement += char;
        }
    }
    
    if (currentElement) elements.push(this.formatNote(currentElement));
    return elements;
}

createPairedLines(musicElements, lyrics) {
    let output = '<div class="music-line">';
    
    musicElements.forEach((noteHtml, index) => {
        const lyric = lyrics[index] || '?';
        output += `
            <div class="note-container">
                <div class="note">${noteHtml}</div>
                <div class="lyric brown-lyrics">${lyric}</div>
            </div>
        `;
    });

    if (musicElements.length !== lyrics.length) {
        output += `<div class="error-message">歌词与音符数量不匹配 (${lyrics.length} vs ${musicElements.length})</div>`;
    }

    return output + '</div>';
}

formatNote(note) {
    let html = note;
    const slashCount = (note.match(/\//g) || []).length;
    
    if (note.includes('"')) {
        const [notePart, chord] = note.split('"');
        html = `<span class="blue-note">
            <span class="chord">${chord}</span>
            ${this.applyNoteStyle(notePart)}
        </span>`;
    } else {
        html = this.applyNoteStyle(note);
    }

    return html;
}

applyNoteStyle(note) {
    const slashCount = (note.match(/\//g) || []).length;
    let styledNote = note;
    
    if (slashCount === 1) {
        styledNote = `<span class="eighth-note">${note}</span>`;
    } else if (slashCount >= 2) {
        styledNote = `<span class="sixteenth-note">${note}</span>`;
    }
    
    return styledNote;
}

// 保持其他方法不变
// ...
}

new SheetMusicEditor();
</script>