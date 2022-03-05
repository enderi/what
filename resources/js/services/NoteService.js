export default function(rawNotes) {
    var notesByUuid = []
    
    _.each(rawNotes.notes, (n) => notesByUuid[n.uuid] = n)
}