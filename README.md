# Spellwell

This my first project to favor logic over style and my first project to feature dark mode, which I generally prefer, aesthetics be damned. It's also my first project in which I just decided I wanted to do a thing and did it. All of my prior projects were like, "What will a company probably want me to do?" The equation is super simple, but was highly enjoyable to create & it makes me think I should find a spot in finance, in which I'm already interested.

### Purpose
Dungeons & Dragons users enter in known stats for their enemy and stats for their character. The application then runs a calculation to determine which spell type has the highest percentage chance (using a fair 20-sided die) to hit the target. This is a slightly more complicated equation than it sounds because sometimes it's the player rolling, while other times it's the target enemy rolling, and the winner of the tie is always in favor of the roller. 

## Features
- calculation of expected hit percentage
- data entry with default values
- self-sorted list of results

### Backend Features
- ngrx state
- reactive forms with validation
- grid & table styling

## Future Enhancements
- API for importing monsters and searching to pre-fill stat blocks
- (multiple) character save
- (multiple) custom monster save
- API to pull in spell lists
- display of spells that match class/subclass/spell type filters
- modification of hit percentages based on applied conditions (moster & character)
- authorization module
- expected damage output (based on average hit value & % chance to hit)
- critical hit percentage (65%) line

## What I Learned
- how challenging it is to select the right input / results layout
- importance of the use of "or undefined" in data models
- ordering styling components using [ngStyle], though I could have just as easily used [ngClass]
