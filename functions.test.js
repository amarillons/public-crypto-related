const functions = require('./functions')

test('testing func2', () => {
    // expect(functions.add(2,2)).toBe(4);
    expect(functions.func2(4)).toBe(123);
    expect(functions.func2(4)).not.toBe(1234);
    // expect(functions.getBalance('0x56416D060Bf9b0cD18f697C38f52437d791A8b90','0x4E944bb0399553c36461F678ff8c188D9A8f3FA3')).toBe(124);
})