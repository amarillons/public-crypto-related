const functions = require('./functions')

test('testing func2', () => {
    // expect(functions.add(2,2)).toBe(4);
    expect(functions.func2(4)).toBe(123);
    expect(functions.func2(4)).not.toBe(1234);
})

test('testing x squared', () => {
    expect(functions.func3(-2)).toBe(4);
    expect(functions.func3(4)).toBe(16);
})