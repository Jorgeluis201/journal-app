import React from 'react'
import { useSelector } from 'react-redux'
import { JournalEntry } from './JournalEntry'

export const JournalEntries = () => {
    
    const { notes } = useSelector(state => state.notes);
    
    return (
        <div className="journal__entries">
            {
                notes.map( note => (
                    <JournalEntry 
                        key={notes.id}
                        // Extraemos cada una de las propiedades que tengan los notes.
                        {...note}
                    />
                ))
            }
        </div>
    )
}
