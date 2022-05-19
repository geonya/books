use std::io;

fn temperature() {
    println!("섭씨 온도를 입력해주세요.");
    loop {
        let mut guess = String::new();
        io::stdin()
            .read_line(&mut guess)
            .expect("입력한 값을 읽지 못했습니다.");
        let guess: i32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };
        let fahrenheit: i32 = (guess * 9 / 5) + 32;
        println!("계산한 화씨 온도는 {} 입니다.", fahrenheit);
        break;
    }
}
