bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
input.onButtonPressed(Button.B, function () {
    bank += 1
    midi.channel(1).setInstrument(bank % 14)
    while (input.buttonIsPressed(Button.B)) {
        basic.pause(100)
    }
})
let noteR = 0
let noteOn = 0
let bank = 0
basic.showString("=")
let note = [60, 62, 64, 67, 69]
note.reverse()
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        if (noteOn == 0) {
            noteR = Math.constrain(Math.map(input.rotation(Rotation.Pitch), -10, 50, 0, 4), 0, 4)
            // noteR = Math.randomRange(0, 4)
            midi.channel(1).noteOn(note[noteR])
            noteOn = 1
        }
    } else {
        if (noteOn == 1) {
            midi.channel(1).noteOff(note[noteR])
            noteOn = 0
        }
    }
    midi.pitchBend(8192 + 90 * input.rotation(Rotation.Roll))
    midi.channel(1).controlChange(1, input.lightLevel())
})
