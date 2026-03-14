document.addEventListener("DOMContentLoaded", function ()
{
	const noteContainer = document.getElementById("note-container");
	const newNoteButton = document.getElementById("new-note-button");
	const colorForm = document.getElementById("color-form");
	const colorInput = document.getElementById("color-input");

	// TODO: Load the note color from the local storage.
	let noteColor = null; // Stores the selected note color from the form.
	noteColor = localStorage.getItem("noteColor") || "#ffff88"; // Loads the note color from the local storage or uses a default color if not found.	
	// TODO: Load the note ID counter from the local storage.
	noteIdCounter = parseInt(localStorage.getItem("noteIdCounter")) || 0;
	// TODO: Load the notes from the local storage.
	const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];

	for (const note of savedNotes)
	{
		const noteElement = document.createElement("textarea");
		noteElement.setAttribute("data-note-id", note.id.toString());
		noteElement.value = note.content;
		noteElement.className = "note";
		noteElement.style.backgroundColor = note.color || noteColor; // Uses the note's color or the last selected note color.
		noteContainer.appendChild(noteElement);
	}
	function addNewNote ()
	{
		const id = noteIdCounter;
		const content = `Note ${id}`;

		const note = document.createElement("textarea");
		note.setAttribute("data-note-id", id.toString()); // Stores the note ID to its data attribute.
		note.value = content; // Sets the note ID as value.
		note.className = "note"; // Sets a CSS class.
		note.style.backgroundColor = noteColor; // Sets the note's background color using the last selected note color.
		noteContainer.appendChild(note); // Appends it to the note container element as its child.

		noteIdCounter++; // Increments the counter since the ID is used for this note.

		// TODO: Add new note to the saved notes in the local storage.
		const newNoteData = {
			id: id,
			content: content,
			color: noteColor
		};
		savedNotes.push(newNoteData);
		localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
		localStorage.setItem("noteIdCounter", noteIdCounter.toString());
	}

	colorForm.addEventListener("submit", function (event)
	{
		event.preventDefault(); // Prevents the default event.

		const newColor = colorInput.value.trim();  // Removes whitespaces.

		const notes = document.querySelectorAll(".note");
		for (const note of notes)
		{
			note.style.backgroundColor = newColor;
		}

		colorInput.value = ""; // Clears the color input field after from submission.

		noteColor = newColor; // Updates the stored note color with the new selection.

		// TODO: Update the note color in the local storage.
		localStorage.setItem("noteColor", noteColor);
	});

	newNoteButton.addEventListener("click", function ()
	{
		addNewNote();
	});

	document.addEventListener("dblclick", function (event)
	{
		if (event.target.classList.contains("note"))
		{
			event.target.remove(); // Removes the clicked note.

			// TODO: Delete the note from the saved notes in the local storage.
			const noteId = parseInt(event.target.getAttribute("data-note-id"));
			const noteIndex = savedNotes.findIndex(note => note.id === noteId);
			if (noteIndex !== -1)
			{
				savedNotes.splice(noteIndex, 1); // Removes the note from the saved notes array.
				localStorage.setItem("savedNotes", JSON.stringify(savedNotes)); // Updates the local storage with the new saved notes array.
			}
		}
	});

	noteContainer.addEventListener("blur", function (event)
	{
		if (event.target.classList.contains("note"))
		{
			// TODO: Update the note from the saved notes in the local storage.
			const noteId = parseInt(event.target.getAttribute("data-note-id"));
			const noteIndex = savedNotes.findIndex(note => note.id === noteId);
			if (noteIndex !== -1)
			{
				savedNotes[noteIndex].content = event.target.value; // Updates the content of the note in the saved notes array.
				localStorage.setItem("savedNotes", JSON.stringify(savedNotes)); // Updates the local storage with the new saved notes array.
			}
		}
	}, true);

	window.addEventListener("keydown", function (event)
	{
		/* Ignores key presses made for color and note content inputs. */
		if (event.target.id === "color-input" || event.target.type === "textarea")
		{
			return;
		}

		/* Adds a new note when the "n" key is pressed. */
		if (event.key === "n" || event.key === "N")
		{
			addNewNote(); // Adds a new note.
		}
	});
});
