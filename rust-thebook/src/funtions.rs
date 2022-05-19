fn main() {
    print_labeled_measurement(5, 'h');
}

fn another_function(x: i32) {
    println!("The value of x is : {}", x);
}

fn print_labeled_measurement(value: i32, unit_label: char) {
    println!("The measurement is : {} {}", value, unit_label)
}

//Note that we defined another_function after the main function in the source code; we could have defined it before as well. Rust doesn’t care where you define your functions, only that they’re defined somewhere.

fn five() -> i32 {
    5
}
fn main() {
    let x = plus_one(5);
    println!("The value of x is : {}", x);
}

fn plus_one(x: i32) -> i32 {
    x + 1
}
