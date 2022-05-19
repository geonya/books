# RUST : The Book

# 5

- Rust doesn’t allow us to mark only certain fields as mutable

‘소유권' 이라는 컨셉에서는, 프로그램의 데이터는 변수에 의해 소유됨

데이터는 한번에 한 소유자에 의해서 소유될 수 있음

Rust uses a third approach: memory is managed through a system of ownership with a set of rules that the compiler checks. If any of the rules are violated, the program won’t compile. None of the features of ownership will slow down your program while it’s running.

Because ownership is a new concept for many programmers, it does take some time to get used to. The good news is that the more experienced you become with Rust and the rules of the ownership system, the easier you’ll find it to naturally develop code that is safe and efficient. Keep at it!

When you understand ownership, you’ll have a solid foundation for understanding the features that make Rust unique. In this chapter, you’ll learn ownership by working through some examples that focus on a very common data structure: strings.

>

### **스택**

매우 빠른 액세스

변수를 명시 적으로 할당 해제 할 필요가 없습니다.

공간은 CPU에 의해 효율적으로 관리되고 메모리는 단편화되지 않습니다.

지역 변수 만

스택 크기 제한 (OS에 따라 다름)

변수의 크기를 조정할 수 없습니다.

### **힙**

변수는 전역 적으로 액세스 할 수 있습니다.

메모리 크기 제한 없음

(상대적으로) 느린 액세스

효율적인 공간 사용을 보장하지 못하면 메모리 블록이 할당 된 후 시간이 지남에 따라 메모리가 조각화되어 해제 될 수 있습니다.

메모리를 관리해야합니다 (변수를 할당하고 해제하는 책임이 있습니다)

변수는 C언어 realloc() or 자바 new

Keeping track of what parts of code are using what data on the heap, minimizing the amount of duplicate data on the heap, and cleaning up unused data on the heap so you don’t run out of space are all problems that ownership addresses. Once you understand ownership, you won’t need to think about the stack and the heap very often, but knowing that the main purpose of ownership is to manage heap data can help explain why it works the way it does.

### [Ownership Rules](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#ownership-rules)

First, let’s take a look at the ownership rules. Keep these rules in mind as we work through the examples that illustrate them:

- Each value in Rust has a variable that’s called its *owner*.
- There can only be one owner at a time.
- When the owner goes out of scope, the value will be dropped.

With the `String`
 type, in order to support a mutable, growable piece of text, we need to allocate an amount of memory on the heap, unknown at compile time, to hold the contents. This means:

In most languages without a GC, it’s our responsibility to identify when memory is no longer being used and call code to explicitly return it, just as we did to request it. Doing this correctly has historically been a difficult programming problem. If we forget, we’ll waste memory. If we do it too early, we’ll have an invalid variable. If we do it twice, that’s a bug too. We need to pair exactly one `allocate`
 with exactly one `free`
.

Rust calls a special function for us. This function is called `[drop](https://doc.rust-lang.org/std/ops/trait.Drop.html#tymethod.drop)`
, and it’s where the author of `String`
 can put the code to return the memory. Rust calls `drop`
 automatically at the closing curly bracket.

```tsx
let s1 = String::from("hello");
let s2 = s1;
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/30414656-b0d0-4129-b360-7371173d2f62/Untitled.png)

Earlier, we said that when a variable goes out of scope, Rust automatically calls the `drop`
 function and cleans up the heap memory for that variable. But Figure 4-2 shows both data pointers pointing to the same location. This is a problem: when `s2`
 and `s1`
 go out of scope, they will both try to free the same memory. This is known as a *double free*
 error and is one of the memory safety bugs we mentioned previously. Freeing memory twice can lead to memory corruption, which can potentially lead to security vulnerabilities.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9832edb4-781a-42c2-ba5f-db8f5c4f40e2/Untitled.png)

**Figure 4-4: Representation in memory after** `s1` **has been invalidated**

Rust also invalidates the first variable, instead of calling it a shallow copy, it’s known as a *move*
. In this example, we would say that `s1`
 was *moved*
 into `s2`
. So what actually happens is shown in Figure 4-4.

That solves our problem! With only `s2`
 valid, when it goes out of scope, it alone will free the memory, and we’re done.

In addition, there’s a design choice that’s implied by this: Rust will never automatically create “deep” copies of your data. Therefore, any *automatic*
 copying can be assumed to be inexpensive in terms of runtime performance.

```tsx
let x = 5;
let y = x;
println!("x = {}, y = {} ", x, y);
```

But this code seems to contradict what we just learned: we don’t have a call to `clone`, but `x` is still valid and wasn’t moved into `y`.

The reason is that types such as integers that have a known size at compile time are stored entirely on the stack, so copies of the actual values are quick to make. That means there’s no reason we would want to prevent `x` from being valid after we create the variable `y`. In other words, there’s no difference between deep and shallow copying here, so calling `clone` wouldn’t do anything different from the usual shallow copying and we can leave it out.

So what types implement the `Copy`
 trait? You can check the documentation for the given type to be sure, but as a general rule, any group of simple scalar values can implement `Copy`
, and nothing that requires allocation or is some form of resource can implement `Copy`
. Here are some of the types that implement `Copy`

- All the integer types, such as `u32`.
- The Boolean type, `bool`, with values `true` and `false`.
- All the floating point types, such as `f64`.
- The character type, `char`.
- Tuples, if they only contain types that also implement `Copy`. For example, `(i32, i32)` implements `Copy`, but `(i32, String)` does not.

```tsx
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);

    println!("The length of '{}' is {}", s1, len);
}

fn calculate_length(s: &String) -> usize { // s is  a reference to a String
    s.len()
}
```

First, notice that all the tuple code in the variable declaration and the function return value is gone. Second, note that we pass `&s1`
 into `calculate_length`
 and, in its definition, we take `&String`
 rather than `String`
. These ampersands represent *references*
, and they allow you to refer to some value without taking ownership of it. Figure 4-5 depicts this concept.

The `&s1` syntax lets us create a reference that *refers* to the value of `s1` but does not own it. Because it does not own it, the value it points to will not be dropped when the reference stops being used.

# B

```rust
fn main() {
    let s = String::from("Hello");
    change(&s);
}

fn change(some_string: &String) {
    some_string.push_str(", world")
    //Just as variables are immutable by default, so are references. We’re not allowed to modify something we have a reference to.
}
```

So what happens if we try to modify something we’re borrowing? Try the code in Listing 4-6. Spoiler alert: it doesn’t work!

```tsx
fn copy_error() {
    let mut s = String::from("hello");
    let r1 = &mut s;
    let r2 = &mut s;
		// this not works
    println!("{}, {}", r1, r2);
}
//  let r1 = &mut s;
//    |              ------ first mutable borrow occurs here
// 15 |     let r2 = &mut s;
//    |              ^^^^^^ second mutable borrow occurs here
// 16 |
// 17 |     println!("{}, {}", r1, r2);
//    |                        -- first borrow later used here
```

The restriction preventing multiple mutable references to the same data at the same time allows for mutation but in a very controlled fashion. It’s something that new Rustaceans struggle with, because most languages let you mutate whenever you’d like. The benefit of having this restriction is that Rust can prevent data races at compile time. A *data race* is similar to a race condition and happens when these three behaviors occur:

- Two or more pointers access the same data at the same time.
- At least one of the pointers is being used to write to the data.
- There’s no mechanism being used to synchronize access to the data.

Data races cause undefined behavior and can be difficult to diagnose and fix when you’re trying to track them down at runtime; Rust prevents this problem by refusing to compile code with data races!

this will work

```tsx
let mut s = String::from("hello");
    {
        let r1 = &mut s;
    }
    let r2 = &mut s;
```

```tsx
let mut s = String::from("hello");

    let r1 = &s; // no problem
    let r2 = &s; // no problem
    let r3 = &mut s; // BIG PROBLEM

    println!("{}, {}, and {}", r1, r2, r3);
```

Rust enforces a similar rule for combining mutable and immutable references. This code results in an error:

this works too

```tsx
fn main() {
    let mut s = String::from("hello");
    let r1 = &s;

    let r2 = &s;

    println!("{} and {}", r1, r2);

    let r3 = &mut s;
    println!("{}", r3);
}
```

The scopes of the immutable references `r1`
 and `r2`
 end after the `println!`
 where they are last used, which is before the mutable reference `r3`
 is created. These scopes don’t overlap, so this code is allowed. The ability of the compiler to tell that a reference is no longer being used at a point before the end of the scope is called *Non-Lexical Lifetimes*
 (NLL for short), and you can read more about it in [The Edition Guide](https://doc.rust-lang.org/edition-guide/rust-2018/ownership-and-lifetimes/non-lexical-lifetimes.html)
.

error

```tsx
fn main() {
    let reference_to_nothing = dangle();
}

fn dangle() -> &String {
    let s = String::from("hello");
    &s
}
```

Because `s`
 is created inside `dangle`
, when the code of `dangle`
 is finished, `s`
 will be deallocated. But we tried to return a reference to it. That means this reference would be pointing to an invalid `String`
. That’s no good! Rust won’t let us do this.

solution

```tsx
fn main() {
    let reference_to_nothing = dangle();
    println!("{}", reference_to_nothing)
}

fn dangle() -> String {
    let s = String::from("hello");
    s
}
```

The solution here is to return the `String` directly:

### [The Rules of References](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html#the-rules-of-references)

Let’s recap what we’ve discussed about references:

- At any given time, you can have *either* one mutable reference *or* any number of immutable references.
- References must always be valid.

### slice

_Slices_
 let you reference a contiguous sequence of elements in a collection rather than the whole collection. A slice is a kind of reference, so it does not have ownership.

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}
```

```rust
    let user2 = User {
        active: user1.active,
        username: user1.username,
        email: String::from("another@example.com"),
        sign_in_count: user1.sign_in_count,
    };
```

Listing 5-6: Creating a new User instance using one of the values from user1

Using struct update syntax, we can achieve the same effect with less code, as shown in Listing 5-7. The syntax .. specifies that the remaining fields not explicitly set should have the same value as the fields in the given instance.

```rust
    let user2 = User {
        email: String::from("another@example.com"),
        ..user1
    };
```

Note that the struct update syntax is like assignment with = because it moves the data, just as we saw in the “Ways Variables and Data Interact: Move” section. In this example, we can no longer use user1 after creating user2 because the String in the username field of user1 was moved into user2. If we had given user2 new String values for both email and username, and thus only used the active and sign_in_count values from user1, then user1 would still be valid after creating user2. The types of active and sign_in_count are types that implement the Copy trait, so the behavior we discussed in the “Stack-Only Data: Copy” section would apply.

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);

```

```rust
fn main() {
    let width1 = 30;
    let height1 = 50;

    println!(
        "The area of the rectangle is {} square pixels.",
        area(width1, height1)
    );
}

fn area(width: u32, height: u32) -> u32 {
    width * height
}

--> refactoring

fn main() {
    let rect1 = (30, 50);
    println!(
        "The area of the rectangle is {} sqaure pixels.",
        area(rect1)
    );
}

fn area(dimentions: (u32, u32)) -> u32 {
    dimentions.0 * dimentions.1
}

- In one way, this program is better. Tuples let us add a bit of structure, and we’re now passing just one argument. But in another way, this version is less clear: tuples don’t name their elements, so our calculation has become more confusing because we have to index into the parts of the tuple.


struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    println!(
        "The area of the rectangle is {} sqaure pixels.",
        area(&rect1)
    );
}

fn area(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}


Our area function is now defined with one parameter, which we’ve named rectangle, whose type is an immutable borrow of a struct Rectangle instance. As mentioned in Chapter 4, we want to borrow the struct rather than take ownership of it. This way, main retains its ownership and can continue using rect1, which is the reason we use the & in the function signature and where we call the function.

it gives descriptive names to the values rather than using the tuple index values of 0 and 1. This

#[derive(Debug)]

struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let scale = 2;
    let rect1 = Rectangle {
        width: dbg!(30 * scale),
        height: 50,
    };
    dbg!(&rect1);
}

// Using method

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}
fn main() {
    let rect = Rectangle {
        width: 32,
        height: 30,
    };
    println!("rect : {:?}", rect);
    println!(
        "The area of the rectanble is {} square pixels.",
        rect.area()
    );
}


; 이 없는 식은 implicit return 한다.

fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a.iter() {
        println!("value: {}", element);
    }
}

for loop 구문은 그 안전성과 간결함 덕분에 러스트에서 가장 많이 사용된다.


fn main() {
    for number in (1..4).rev() {
        println!("{}!", number);
    }
    println!("발사!");
}

3!
2!
1!
발사!


guessing game

let mut guess = String::new();
// ::new 줄에서 사용된 :: 문법은 new 함수가 String type의 연관 함수라는 (associated function) 라는 점을 의미한다.
// 연관 함수는 특정한 인스턴스가 아니라 타입 자체에 구현된 함수다. 다른 언어는 이런 메서드를 정적 메서드라고 부르기도 한다.



use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("숫자를 맞춰 봅시다!");
    let secret_number = rand::thread_rng().gen_range(1..101);
    println!("사용자가 맞춰야할 숫자: {}", secret_number);
    loop {
        println!("정답이라고 생각하는 숫자를 입력하세요.");
        let mut guess = String::new();
        io::stdin()
            .read_line(&mut guess)
            .expect("입력한 값을 읽지 못했습니다.");
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };
        println!("입력한 값: {}", guess);
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("입력한 숫자가 작습니다."),
            Ordering::Greater => println!("입력한 숫자가 큽니다."),
            Ordering::Equal => {
                println!("정답");
                break;
            }
        }
    }
}


```

스택 메모리와 힙 메모리
스택과 힙은 모두 코드가 런타임에 활용하는 메모리의 일부이며 각자 다른 방법으로 데이터를 구성한다.
스택은 유입된 순서대로 데이터를 저장하며 데이터를 읽을 때는 그 반대 순서로 읽는다.
그래서 마지막에 들어온 값을 가장 먼저 읽는 (LIFO, Last In ,First Out) 구조다.
스택에 새로운 데이터를 쌓는 동작을 push라고 하며, 스택의 제일 위에서 데이터를 꺼내는 동작을 pop이라고 한다.

스택에 저장하는 모든 데이터는 고정된 크기를 가져야 하낟. 컴파일 시점에 크기를알 수 없는 데이터나 런타임에 동적으로 크기가 변하는 데이터는 힙 메모리에 저장한다.
힙은 스택에 비하면 조금더 복잡하다. 예를 들어, 힙에 데이터를 넣는 동작은 메모리의 일정 공간을 할애할 것을 요청하는 것이다.
따라서 운영체제는 힙 메모리에서 일정한 공간을 찾아 사용 중인 메모리로 표시한 후, 해당 메모리의 주솟값이 pointer를 넘겨준다. 이 과정을 힙 메모리 할당 (allocating on the heap) 또는 단순히 allocating 이라고 한다.
스택에 값을 푸시하는 동작에는 할당이 발생하지 않는다. 포인터는 이미 크기가 고정된 값이므로 포인터는 스택에 저장할 수 있지만 실제 포인터가 가리키는 데이터가 필요할 때는 포인터가 가리키는 메모리를 따라가야 한다.
스택에 데이터를 푸시하는 것이 힙에 할당하는 것보다 빠른 이유는 운영 체제가 새 데이터를 저장할 공간을 찾을 필요가 없기 때문이다. 새 데이터는 항상 스택의 가장 위에 추가된다. 힙에 공간을 할당하는 것은 상대적으로 더 많은 작업이 필요하다. 운영체제가 먼저 데이터를 저장할 충분히 큰 공간을 찾은 후 다음 할당 작업을 위한 예약 작업을 수행해야 하는 이유다.
힙 메모리에 저장된 데이터에 대한 접근은 스택에 저장된 데이터에 접근하는 거솝다 느리다. 그 이유는 포인터를 따라가야 하기 때문이다. 현대의 프로세서들은 메모리 사이를 왔다 갔다 하는 일이 더 적을수록 더 바르게 동작한다.
코드의 어느 부분이 힙 메모리에 저장된 데이터를 사용하는지 추적하고 힙에 저장되는 데이터의 중복을 최소화해 사용하지 않는 데이터를 힙 메모리에서 제거하면 메모리 부족 문제를 해소할 수 있다. 러스트의 소유권 기능은 바로 이 문제를 해결하려는 방법이다.

# 소유권 규칙

    1. 러스트가 다루는 각각의 값은 소유자(owner)라고 부르는 변수를 가지고 있다.
    2. 특정 시점에 값의 소유자는 단 하나 뿐이다.
    3. 소유자가 범위를 벗어나면 그 값은 제거된다.

## String Type

    가변 문자열을 지원하는 String 타입은 길이를 조절할 수 있는 텍스트이므로 컴파일 시점에 알 수 없는 내용을 저장하기 위해 힙 메모리에 일정 부분의 메모리를 할당해야한다.
    - 해당 메모리는 반드시 런타임에 운영체제에 요청해야 한다.
    - String 타입의 사용이 완료된 후에는 이 메모리를 운영체제에 다시 돌려줄 방법이 필요하다.

# RAII 패턴

러스트는 메모리의 할당과 해제를 다른 방식으로 수행한다. 즉, 변수에 할당된 메모리는 변수를 소유한 범위(scope)를 벗어나는 순간 자동으로 해제한다.
변수가 범위를 벗어나면 러스트는 drop 이라는 이름의 특별한 함수를 호출한다. drop 함수는 String 타입을 구현한 개발자가 메모리를 해제하는 코드를 작성해 둔 함수다. 러스트는 닫는 줄광호를 만나면 자동으로 drop 함수를 호출한다.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("{}, world!", s1);
    println!("{}, world!", s2);
}

```

러스트는 첫번째 변수를 무료화해버리므로 이 동작은 얕은 복사라고 하지 않고 이동(move)라고 한다. 이 예제의 경우 변수 s1이 변수 s2로 이동했다고 표현한다.
println!("{}, world!", s2); 만 실행 가능

러스트는 절대 자동으로 데이터에 대한 깊은 복사를 수행하지 않는다. 그래서 런타임 성능 관점에서 볼 대, 모든 자동 복사 작업은 매우 가벼운 작업이다.

# 복제 Clone

    만일 스택 데이터가 아니라 힙 메모리에 저장된 String 데이터를 복사하기를 원한다면 clone 이라는 공통 메서드를 사용하면 된다.

```rust
    fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();

    println!("s1 = {}, s2 = {}", s1, s2);
}
```

    메서드를 통해 추가 코드 실행 -> 복사하는 메모리의 크기에 따라 무거운 작업이 될 수도 있음

# 스택 전용 데이터 : 복사 Copy

    정수형 데이터를 사용하는 경우 다음은 정상 동작한다.
    그 이유는 정수형 같은 타입은 컴파일 시점에 이미 그 크기를 알 수 있으며, 온전히 스택에 저장되기 때문에 실제 값을 복사해도 전혀 부담되지 않는다.

    러스트는 스택에 저장되는 정수형 같은 타입에 적용할 수 있는 Copy trait 라는 특별한 특성을 제공한다. 만일 어떤 타입에 Copy trait 가 적용되어 잇다면 이전 변수를 새 변수에 할당해도 무효화되지 않는다.
    다만, 어떤 타입, 혹은 그 타입의 어느 일부에 Drop 트레이트가 적용되어 있으면 Copy 트레이트를 적용하려고 하면 컴파일 에러가 발생한다.
    - u32 와 같은 모든 정수형 타입
    - true 와 false 값만을 가지는 boolean 타입, bool
    - 문자 타입, char
    - f64와 같은 모든 부동 소수점 타입
    - Copy trait 가 적용된 타입을 포함하는 튜플, 예를 들면 (i32, i32) 튜플에는 Copy 트레이트가 적용되지만, (i32, String) 튜플에는 적용 X

```rust
fn main() {
    let s = String::from("hello"); // 변수가 s 범위 내에서 생성
    takes_ownership(s); // 변수 s의 값이 함수내로 이동

    let x = 5; // 변수 x가 범위 내에 생성
    makes_copy(x); // 변수 x의 값이 함수로 이동
                   // 하지만 i32 타입은 복사 수행이 가능하므로
                   // 변수 x는 이 시점 이후로도 여전히 유효
} // 이 지점에서 변수 x가 범위를 벗어난 후, 다음으로 변수 s도 범위를 벗어난다.
  // 하지만 변수 s의 값은 함수 내로 이동했기 때문에 아무런 일도 일어나지 않는다.

fn takes_ownership(some_string: String) {
    // some_string 변수가 범위 내에 생성
    println!("{}", some_string);
} // 이 지점에서 some_string 변수가 범위를 벗어나면 'drop' 함수가 호출된다.
  // 따라서 some_string 변수가 사용중이던 메모리가 해제된다.

fn makes_copy(some_integer: i32) {
    // some_integer 변수가 범위 내에서 생성
    println!("{}", some_integer);
} // 이 지점에서 some_integer 변수가 범위를 벗어난다. 하지만 아무런 일도 일어나지 않는다.

```

    값을 다른 변수에 할당하면 소유권이 옮겨진다. 힙 메모리에 저장된 변수의 데이터는 소유권이 다른 변수로 옮겨지지 않았다면 범위를 벗어날 때 drop 함수에 의해 제거된다.

- 매개변수 소유권을 다시 리턴하는 함수 (튜플을 이용)

```rust
fn main() {
    let s1 = String::from("hello");
    let (s2, len) = calculate_length(s1); // s1 -> s2 소유권 이전
    println!("{}의 길이는 {}입니다", s2, len);
}

fn calculate_length(s: String) -> (String, usize) {
    let lenth = s.len();
    (s, lenth)
}
```

# 참조와 대여

hr

- s1 소유권을 이전시키지 않고 함수에 값을 전달하는 방법

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("{}의 길이는 {}입니다.", s1, len); // s1 소유권 유지
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

& 기호가 바로 참조(references) 이를 이용하면 소유권을 가져오지 않고도 값을 참조할 수 있다.
(반대로 역참조는 \* 에 의해 동작한다.)

```rust
let s1 = String::from("hello");
let len = calculate_length(&s1);
```

&s1 문법을 이용하면 변수 s1의 값을 읽을 수 있지만 소유권을 가져오지 않는 참조를 생성할 수 있다.
참조는 소유권을 갖지 않기 때문에 참조가 가리키는 값은 참조가 범위를 벗어나더라도 drop 함수도 호출되지 않는다.

마찬가지로 함수의 시그니처에도 &를 이용해 매개변수 s의 타입이 참조임을 표현한다. 다음 코드의 주석을 살펴보자.

```rust
fn calculate_length(s: &String) -> usize { // 매개변수 s는 String 에 대하 참조다.
    s.len()
} // 이 시점에서 변수 s가 범위를 벗어난다.
// 하지만 이 변수는 자신이 가리키는 값에 대한 소유권이 없으므로 아무 일도 일어나지 않는다.
```

변수 s가 유효한 범위는 함수 매개변수의 범위와 같지만, 소유권이 없으므로 범위를 벗어나다러도 변수가 가리키는 참조의 drop 함수가
호출되지 않는다. 함수의 매개변수가 실제 값이 아닌 참조를 가리킬 때는 소유권이 없으므로 소유권을 돌려주기 위해 변수를 다시 리턴할 필요가 없다.

이처럼 함수 매개변수로 참조를 전달하는 것을 `borrowing` : `대여` 라고 한다.
소유권을 빌리고 사용이 끝나면 되돌려주는 개념

그리고 대여한 변수는 수정할 수 없다.
변수가 기본적으로 불변인 것처럼 참조도 기본적으로 불변이다. 따라서 참조하고 있는 값을 변경할 수 없다.

```rust Error
Error
fn main() {
    let s = String::from("hello");
    change(&s);
}

fn change(some_string: &String) {
    some_string.push_str(", world"); // some_string` is a `&` reference, so the data it refers to cannot be borrowed as mutable
}
```

위 코드를 수정하면 에러를 없앨 수 있다.

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

변수 s에 mut 키워드를 추가하고 &mut s 와 같이 가변 참조를 생성한 후 some_string:&mut String 과 같이 가변 참조를 전달 받으면 된다.

하지만 가변 참조에도 한 가지 제약이 있다. 특정 범위 내의 특정 데이터에 대한 가변 참조는 오직 한 개만 존재해야한다.

```rust Error
Error
// cannot borrwo 's' as mutable more than once at a time

let mut s = String::from("hello");

let r1 = &mut s; // first mutable borrow occurs here
let r2 = &mut s; // second mutable borrow occurs here

println!("{}, {}", r1, r2);
```

데이터 경합 (data races) 조건

- 둘 혹은 그 이상의 포인터가 동시에 같은 데이터를 읽거나 쓰기 위해 접근할 때
- 최소한 하나의 포인터가 데이터를 쓰기 위해 사용될 때
- 데이터에 대한 접근을 동기화할 수 있는 메커니즘이 없을 때

데이터 경합은 예측할 수 없는 결과를 유발하며, 런타임에 원인을 파악하고 수정하기가 매우 어렵다.
러스트는 데이터 경합이 발생하는 코드의 컴파일을 허용하지 않는 방식으로 이 문제를 예방한다.

늘 그렇듯이 중괄호를 이용하면 새로운 범위를 생성할 수 있으므로 동시에 활용할 수는 없지만 여러개의 가변 참조를 활용할 수 있다.

```rust
let mut s = String::from("hello");
{
    let r1 = &mut s;
} // 이 시점에서 변수 r1이 범위를 벗어나므로 이 다음부터는 새로운 참조를 또 생성할 수 있다.
let r2 = &mut s;

println!("{}, {}", r1, r2);

```

```rust Error
Error
let mut s = String::from("hello");

let r1 = &s; // 문제 없음
let r2 = &s; // 문제 없음
let r3 = &mut s; // 문제 발생
println!("{}, {}, and {}", r1, r2 ,r3);

```

불변 참조를 이미 사용 중일 때도 가변 참조를 생성할 수 없다. 어딘가에서 이미 불변 참조를 생성했다면 그 값을 변경해서는 안 되기 때문이다.
반면, 데이터를 읽는 동작은 다른 사용자가 데이터를 읽는 동장에 아무런 영향을 주지 않으므로 불변 참조는 여러 개를 생성해도 무방하다.

### 죽은 참조

```rust Error
Error
fn dangle() -> &String { // dangle 함수는 String에 대한 참조를 리턴한다.
    let s = String::from("hello"); // String 타입의 새로운 변수 s를 생성한다.

    &s // String 타입의 변수 s에 대한 참조를 리턴한다.
}    // 하지만 이 지점에서 변수 s가 범위를 벗어나므로 drop 함수가 호출되고 메모리가 해제된다.
    // 따라서 이 함수는 에러의 위험을 내포하고 있다.
```

문제 해결

```rust
fn no_dangle() -> String }
    let s = String::from("hello");

    s
}
```

이 코드는 문제 없이 실행된다. 변수 s의 소유권이 함수를 호출한 코드로 이동하기 때문에 메모리가 해제되지 않기 때문이다.

### 참조에 대한 규칙

- 어느 한 시점에 코드는 하나의 가변 참조 또는 여러 개의 불변 참조를 생성할 수는 있지만, 둘 모두를 생성할 수는 없다.
- 참조는 항상 유효해야 한다.

# Slice Type

- 슬라이스도 소유권을 갖지 않는 타입이다. 슬라이스를 이용하면 컬렉션 전체가 아니라 컬렉션 내의 연속된 요소들을 참조할 수 있다.

```rust
fn main() {
    let s = String::from("hello world");
    let hello = &s[0..5];
    let world = &s[6..11];

    println!("{},{}", hello, world)
}
```

이렇게 인덱스를 생략할 수 있다.

```rust
fn main() {
    let s = String::from("hello world");
    let hello = &s[..5];
    let world = &s[6..];

    println!("{},{}", hello, world)
}
```

```rust
    let s = String::from("hello world");
    let len = s.len();
    let hello = &s[..5];
    let world = &s[6..len];
    let helloworld = &s[..];
```

```rust Err
Err
fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s);

    s.clear(); //  mutable borrow occurs here
    println!("the first word is : {}", word);
}

fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}

```

불변 참조를 이미 생성한 경우라면 가변 참조를 생성할 수 없다. 하지만 이 코드는 String 타입의 값을 제거해야 하므로
가변 참조가 필요하고 그래서 컴파일에 실패한다.

```rust

fn first_word(s: &str) -> &str {
    // &str - 이 시그니처를 사용하는 이유는 함수를 String 타입과 &str 타입 값에 모두 적용할 수 있기 때문

// let my_string = String::from("hello world");

    // // first_word 함수에 String 타입으로부터 생성한 문자열 슬라이스를 전달한다.
    // let word = first_word(&my_string[..]);

main ->

    let my_string_literal = "hello world";

    // // first_word 함수에 문자열 리터럴 슬라이스를 전달한다.
    // let word = first_word(&my_string_literal[..]);

    // 문자열 리터럴은 이미 문자열 슬라이스이기 때문에
    // 아래의 코드는 슬라이스 문법 없이도 정상적으로 동작한다.

    let word = first_word(my_string_literal);
    println!("{}", word)
```

### 다른 타입의 슬라이스

```rust
    let a = [1, 2, 3, 4, 5];
    let slice = &a[1..3];
```

## 참조와 대여 요약

소유권, 대여 그리고 슬라이스는 러스트 프로그램의 컴파일 시점에 메모리 안정성을 확보하기 위한 개념들이라. 러스트는 다른 시스템 프로그래밍 언어들과 같은 방법으로 메모리 사용에 대한 완전한 통제권을 개발자들에게 제공하지만, 데이터의 소유자가 범위를 벗어날 때 자동으로 해당 데이터의 소유권을 해제함으로써 메모리의 안전한 사용이나 디버깅을 위한 추가 코드를 전혀 작성할 필요가 없다.

hr

# <구조체를 활용한 관련 데이터의 구조화>

hr

구조체는 서로 관련이 있는 여러 값을 의미 있는 하나로 모으고, 이름을 지정해 접근할 수 잇는 사용자 정의 데이터 타입이다.
객체지향 언어에 익숙하다면 구조체는 객체의 데이터 속성과 같다고 생각해도 무방하다.
이번 장에서는 튜플과 구조체의 차이점을 살펴보고, 구조체의 데이터와 관련된 동작을 정의하는데 메서드와 연관 함수를 알아본다.
구조체와 열거자는 여러분이 작성하는 프로그램의 도메인 범주 안에 새로운 타입을 정의하는데 필요한 도구들이며,
이 새로운 타입들 역시 러스트의 컴파일 시점에 타입 검사의 이점을 누릴 수 있다.

hr

## 구조체 정의와 인스턴스 생성

구조체는 튜플과 유사하다. 튜플과 마찬가지로 구조체는 각기 다른 타입의 값으로 구성된다. (배열은 오직 같은 타입으로만 구성)
튜플과는 달리 각 데이터에 별개의 이름을 부여해서 값의 의미를 더 분명하게 표현할 수 있다. (JS의 Object 와 비슷 ?)
또한 각 데이터에 이름이 있으므로 구조체는 튜플보다는 더욱 유연하다.

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}
```

구조체를 정의한 후 이를 사용하려면 각 필드에 저장한 값을 명시해서 구조체의 인스턴스를 생성해야 한다.
구조체의 인스턴스를 생성하려면, 해당 구조체의 이름과 중괄호를 이용해 키 : 값 의 쌍을 나열하면 된다.
여기서 키는 필드의 이름이며, 값은 해당 필드에 저장할 데이터다 .
인스턴스는 해당 타입의 값을 생성하기 위해 이 템플릿에 값을 채워 넣는 것이라고 보면 된다.

구조체에서 원하는 값을 읽으려면 '.' 을 이용하면 된다.
만일 instance 가 mutable 이라면 새로운 값을 대입할 수도 있다.

```rust

let user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
}

user1.email = String::from("anotheemail@example.com"); // 값 변경

```

여기서 주의할 점은 구조체의 인스턴스 자체가 `mutable` 가변이라는 점이다. 러스트는 구조체의 몇몇 필드만을 가변 데이터로 표시하는 것을 지원하지 않는다.
다른 표현식과 마찬가지로 구조체의 새로운 인스턴스도 함수를 이용해 생성할 수 있다. 이때 함수의 마지막 표현식은 묵시적으로 새 인스턴스를 리턴해야 한다.

### 같은 이름의 필드와 변수를 편리하게 활용하기

field init shorthand syntax

```rust
fn build_user(email: String, username:String) -> User {
    User {
        email, // email : email 단축
        username, // username : username
    }
}

```

### 기존의 인스턴스로부터 새 인스턴스 생성하기

이미 존재하는 인스턴스에서 몇 가지 필드의 값만 수정한 상태의 새 구조체 인스턴스가 필요할 때가 종종 있다.
이런 상황에서는 구조체 갱신 문법 struct update syntax 을 이용하면 편리하다.

```rust
let user2 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    ..user1
}
```

### 이름 없는 필드를 가진 튜플 구조체로 다른 타입 생성하기

튜플 구조체 (tuple structs)
구조체에는 이름을 부여하지만 필드에는 이름을 부여하지 않고 타입만 지정한다.

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);

```

여기에서 black 과 origin 값은 서로 다른 타입이다.
왜냐하면 이 둘은 서로 다른 tuple struct 의 instance 이기 때문이다.

### 필드가 없는 유사 유닛 구조체

러스트에는 심지어 필드가 하나도 없는 구조체를 선언할 수도 있다. 이런 구조체를 unit-like structs 라고 한다. 이 구조체는 유닛 타입, 즉 () 과 유사하게 동작하기 때문이다.
유사 유닛 구조체는 어떤 타입의 trait 를 구현해야 하지만, 타입에 저장할 데이터가 없을 때 유용하게 활용할 수 있다.

#### 구조체 데이터의 소유권

```rust
Err

struct User {
    username: &str,
    email:&str,
    sign_in_couunt: u64,
    active:bool,
}

fn main () {
    let user1 = User {
        email: "sdklfjdf@sdkjlfd.com",
        username:"sdlkfds",
        active: true,
        sign_in_count:1,
    }
}

이 코드를 실행하면 compiler 는 lifetime 을 지정해야한다는 오류가 발생한다.
 >> miising lifetime specifier
이 문제는 우선 Stirng 같이 소유할 수 있는 타입을 사용해서 오류를 회피할 수 있고
10장에서 구조체 참조하는 방법에 대해서 자세하게 나온다.
```

### 5.2 구조체를 사용하는 예제 프로그램

```rust

fn main() {
    let width1 = 30;
    let height1 = 50;

    println!("사각형의 면적: {} ", area(width1, height1));
}

fn area(width: u32, height: u32) -> u32 {
    width * height
}

```

#### 5.2.1 튜플을 이용한 리팩토링

```rust

fn main() {
    let rect1 = (30, 50);
    println!("사각형의 면적: {} ", area(rect1));
}

fn area(dimentions: (u32, u32)) -> u32 {
    dimentions.0 * dimentions.1
}
```

#### 5.2.2 구조체를 이용한 리팩토링: 더 많은 의미 반영하기

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("사각형의 면적 : {} 제곱픽셀", area(&rect1))
}

fn area(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}
```

Rectangle 이라는 이름의 구조체를 선언한다.
그리고 중괄호 안에 u32 아팁의 width와 height 필드를 각각 선언한다.
main 함수에서는 Rectangle 구조체의 인스턴스를 생성하고 너비와 놃이를 각각 30, 50으로 초기화한다.

area 함수는 이제 rectangle 이라는 하나의 매개변수만을 사용하며, 이 매개변수의 타입은 Rectangle 구조체의 불변 인스턴스에 대한 대여(borrowing)다.
이렇게 하면 main 함수는 여전히 구조체에 대한 소유권을 가지고 rect1 변수를 계속 사용할 수 있다. area 함수의 시그니처와 호출하는 코드에서 & 기호를 사용한 이유이다.

area 함수는 Rectangle 구조체 인스턴스의 width와 height 필드를 이용해 계산을 수행한다.
area 함수의 시그니처는 이제 함수의 이미, 즉 width와 height 필드값을 이용해 주어진 Rectangle 인스턴스의 면적을 계산한다는 점을 명확히 표현한다.
width와 height 변수가 서로 관련이 있다는 점도 충분히 표현하고 있으며, 0과 1이라는 튜플의 인덱스 대신 의미 있는 이름도 부여했다. 덕분에 코드의 명확성이 몰라보게 좋아졌다!

#### 5.2.3 트레이트를 상속해서 유용한 기능 추가하기

```rust
Err
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    println!("rect1 : {}", rect1);
}

 println!("rect1 : {}", rect1);
                        ^^^^^ `Rectangle` cannot be formatted with the default formatter

println! 매크로가 display 형식을 출력하도록 한다. display 형식은 최종 사용자를 위한 출력 형식이라고 보면 된다.
지금까지 사용하던 기본 타입들은 display 형식을 기본적으로 구현하고 있다.
하지만 구조체는 println!이 출력 형식을 결정하기가 더 어렵다. 왜냐하면 구조체는 자신을 출력한 방법이 하나 이상이기 때문이다.
값들을 쉼표로 구분? 중괄호도 출력?
이런 불명확함 때문에 구조체가 display trait 를 구현하지 않도록 남겨두었다.

```

이 문제를 해결하기 위해서는 ?

```rust

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    println!("rect1 : {:#?}", rect1);
}

 러스트는 derive annotation 을 이용해 사용자 정의 type 에 유용한 동작을 적용할 수 있는 다양한 trait 를 제공한다.
 활용 가능한 trait 와 기능은 10장과 부록 C 를 참고

```

### 5.3 Method Syntax

메소드는 함수와 유사하다. 함수와 마찬가지로 fn 키워드를 이용해 정의하며 name, argument, return type 등을 정의할 수 있다.
또한 함수와 마찬가지로 호출시 실행할 일련의 코드를 정의하고 있다. 하지만 메서드는 함수와 달리 구조체의 context 안에 정의하며,
첫번째 arg 는 항상 method 를 호출할 struct의 instance 를 표현하는 self 여야 한다.
(method는 열거자(spread operator)나 trait 객체에도 정의할 수 있다. )

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 : {:#?}", rect1.area());
}

```

Rectangle 타입의 context 안에 함수를 정의하려면 impl (implementation) 블록을 이용하면 된다. 그런 다음 area 함수를 impl 중괄호 안으로 이동
첫번째 arg 의 이름과 함수 본문 안에서의 참조를 모두 self 로 바꾼다. main 함수 안에서는 area 함수를 호출하면서 rect1 변수를 인수로 전달하고 있다.
하지만 이제는 method 문법을 이용해 area method 를 Rectangle 인스턴스상에서 호출할 수 있다. method syntax 는 intance 다음에 따라온다.
즉, instance 다음에 마침표, method 의 이름, 괄호 그리고 필요한 인수를 전달하면 된다.

area 메서드의 시그니처를 보면 rectangle: &Rectangle 대신 단순히 &self 를 사용하고 있음을 알 수 있다.
이 함수는 이제 Rectangle struct context 안에 존재하므로 러스트는 self 의 타입이 Rectangle 이라는 것을 알고 있기 때문이다. 메서드는 self에 대한 소유권을 갖거나,
이 예제처럼 self의 불변 인스턴스를 대여하거나 혹은 다른 매개변수들처럼 self의 가변 인스턴스를 대여할 수 있다.

예제에서 &self 를 매개변수로 사용한 이유는 함수일 때 &Rectangle 타입을 매개변수로 사용한 것과 같다. 즉, 이 함수는 단순히 구조체의 데이터를 읽을 뿐, 값을 쓰지는 (write)
않기 때문에 굳이 소유권을 가질 필요가 없다. 만일 메서드를 호출한 인스턴스의 값을 변경하고자 한다면 첫번째 매개변수를 &mut self와 같이 선언해야 한다.
첫 번째 매개변수를 self로만 선언해서 인스턴스에 대한 소유권을 갖는 메서드는 사실 드물다. 이 기법은 메서드가 self를 다른 인스턴스로 교체한 후 호출자가 더 이상 예전 인스턴스를
사용하지 못하도록 할 때 활용한다.

함수 대신 메서드를 사용할 때의 장점은 메서드를 호출할 때마다 매번 첫 번째 매개변수로 타입을 넘겨줄 필요가 없다는 점과 더불어 코드를 더 잘 정리할 수 있다는 점이다.
타입과 관련된 모든 것을 하나의 impl 블록에 모을 수 있어서 나중에 다른 개발자가 Rectangle struct의 기능들을 파악하기 위해 라이브러리의 여러 곳을 검색할 필요가 없어진다.

#### 연산자는 어디에?

러스트에는 -> 연산자에 해당하는 연산자가 없다. 대신 러스트는 자동 참조 및 역참조 기능을 제공한다. 메서드의 호출 역시 러스트가 이 기능을 활용하는 부분 중 하나다.

```rust

object.something() 과 같이 메서드를 호출하면 러스트는 메서드의 시그니처에 따라 자동으로 object 변수에 &, &mut 도는 *을 추가한다.
p1.distance(&p2);
(&p1).distance(&p2);
위 두 개 코드는 완전히 같다.
하지만 첫번째 코드가 더 깔끔해 보인다. 이 자동 참조 기능은 메서드가 수진자, 즉 self 타입을 명확하게 선언하고 있기 때문에 동작한다. 메서드의 수진자와 이름 덕분에 러스트는
이 메서드가 값을 읽는지 (&self), 값을 쓰는지(&mut self), 아니면 소비하는지(self) 를 정확하게 알 수 있다.
러스트가 메서드 수신자를 위해 자동으로 대여를 처리해 주는 덕분에 소유권을 다루기가 더욱 편리해진다.

```

### 5.3.2 더 많은 매개변수를 갖는 메서드

```rust

struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    let rect3 = Rectangle {
        width: 60,
        height: 45,
    };

    println!("rect1은 rect2를 포함하는가? {}", rect1.can_hold(&rect2));
    println!("rect1은 rect3를 포함하는가? {}", rect1.can_hold(&rect3));
}


```

### 5.3.3 연관 함수

impl 블록의 또 다른 유용한 기능은 self 매개변수를 사용하지 않는 다른 함수도 정의할 수 있다는 점이다.
이런 함수들은 '연관 함수 (associated functions) ' 라고 한다. 이 함수들은 구조체의 인스턴스를 직접 전달받지 않기 때문에
메서드가 아니라 함수다. 지금까지 수차례 사용했던 `String::from` 함수가 연관 함수의 좋은 예다.

연관 함수는 구조체의 새로운 인스턴스를 리턴하는 `생성자(constructors)`를 구현할 대 자주 사용한다.
예를 들어, 하나의 매개변수를 전달 받아 이 값을 너비와 높이로 지정하는 연관 함수를 정의할 수도 있다. 이렇게 하면 매번 같은 값을 두 번씩 저장하는 것보다
더 쉽게 정사각형을 표현하는 Rectangle 인스턴스를 생성할 수 있다.

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }

}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}

// 똑같은 이름에 impl 을 여러개 생성할 수 있다. 이는 제네릭 타입과 트레이트를 이용할 때 유용하게 활용할 수 있다. (10장 참고)

fn main() {
    let square1 = Rectangle::square(10);
    println!("square1의 넓이는 {}", square1.area());
}

```

## struct 구조체 요약

구조체는 프로그램 안에서 특정한 의미가 있는 사용자 정의 타입을 선언하기 위한 개념이다.
구조체를 이용하면 관련된 데이터를 모아 개별적으로 이름을 부여할 수 있어 코드를 더욱더 깔끔하게 작성할 수 있다.
메서드는 구조체의 인스턴스에 원하는 동작을 부여하며, 연관 함수는 구조체의 인스턴스가 없는 상황에서 구조체에 적용할 수 있는
기능을 구분 짓는데 활용할 수 있다.

// 2022.02.24 (1)

```rust

```

// 2022.02.25

# 6. 열거자 enumerations (enums)

- 열거자를 사용한 데이터의 의미
- Option 열거자
- match 표현식을 이용한 패턴 매칭

// 2022.02.26

# 7. Package, Crate, Module 로 프로젝트 관리하기

- 패키지 : 크레이트를 빌드, 테스트 공유할 수 있는 카고의 기능
- 크레이트 : 라이브러리나 실행 파일을 생성하는 모듈의 트리 (tree)
- 모듈과 use : 코드의 구조와 범위, 그리고 경로의 접근성을 제어하는 기능

#### 절대 경로

```rust
crate::front_of_house::hosting::add_to_waitlist();
```

#### 상대 경로

```rust
front_of_house::hosting::add_to_waitlist();
```

### super

```rust
fn serve_order() {}
mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::serve_order();
    }
    fn cook_order() {}
}
```

- 모든 열것값은 공개된다.
- 덕분에 일일히 pub 키워드를 쓰지 않아도 된다.

```rust
mod back_of_house {
    pub enum Appetizer {
        Soup,
        Salad,
    }
}

pub fn eat_at_restaurant() {
    let order1 = back_of_house::Appetizer::Soup;
    let order2 = back_of_house::Appetizer::Salad;
}

```

## 7.4 use 키워드로 경로를 범위로 가져오기

- 함수를 호출하기 위해 작성했던 경로를 매번 작성하기는 불편하다.
- use 키워드로 경로를 현재 범위로 가져오면 경로의 아이템이 마치 현재 범위의 아이템인 것처럼 호출할 수 있다.

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}

```

- use키워드와 경로를 추가하는 것은 파일 시스템에서 심볼릭 링크를 생성하는 것과 유사하다.
- use 키워드에서 상대 경로 지정은 self 키워드를 이용한 경로를 사용

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use self::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}
```

##### 관용적인 방법

```rust
use std::colletions::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert(1, 2);
}

```

#### as 키워드를 이용해 범위로 가져오는 타입의 이름 재정의

```rust

use std::fmt::Result
use std::io::Result as IoResult;

fn function1() -> Result {
    //
}

fn function2() -> IoResult<()> {
    //
}

```

### 7.4.3 pub use 키워드로 이름을 다시 내보내기

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}

```

`pub use` 구문을 사용하지 않으면 eat_at_restaurant 코드는 hosting::add_to_waitlist 함수를 호출할 수 있지만 <br/>
외부의 코드는 이 함수를 호출할 수 없다.

```rust
use std::coleections::HashMap;
```

이 경로는 표준 라이브러리 크레이트의 이름인 std로 시작하는 절대 경로이다.

### 7.4.5 중첩 경로로 use 목록을 깔끔하게 유지하기

```rust
use std::io;
use std::cmp::Ordering;
>>>
use std::{io, cmp::Ordering};

```

#### self 키워드를 이용하기

```rust
use std::io;
use std::io::Write;
>>> self 키워드 이용
use std::id{self, Write};
```

### 7.4.6 글롭 연산자

```rust
use std::collections::*;
```

```rust
src/lib.rs

mod front_of_house;

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}


```

```rust
src/front_of_house.rs

pub mod hosting;
```

```rust

src/front_of_house/hosting.rs

pub fn add_to_waitlist() {}
```

mod 키워드는 모듈을 선언하며, 러스트는 모듈과 같은 이름의 파일에서 모듈의 콘텐츠를 가져오게 된다.

## 요약

러스트에서는 패키지를 크레이트로 정리하며 크레이트는 모듈을 구성한다. 따라서 한 모듈에 정의된 아이템을
다른 모듈에서 참조할 수 있다.
아이템을 참좋려면 절대 혹은 상대 경로를 사용한다. 이 경로는 use 구문을 이용해 지정된 아이템을 현재 범위로
가져오며 여러 아이템을 현재 범위로 가져올 때 더 짧은 형식의 구문을 사용할 수 있다.
모듈의 코드는 기본적으로 비공개지만, pub 키워드를 추가해서 아이템을 공개할 수 있다.

```rust

```

# 8 범용 컬렉션

- 대부분 데이터 타입은 하나의 특정 값을 표현하지만, 컬렉션은 여러개의 값을 포함
- 내장된 배열과 튜플과는 달리 컬렉션이 가리키는 데이터는 힙 메모리에 저장
- 각각의 컬렉션은 수용량과 처리비용이 다르므로 현재 상황에 따라 적절한 컬렉션을 선택하는 것이 중요함

1. 벡터 : 연속된 일련의 값을 저장
2. 문자열 : 문자의 컬렉션
3. 해시맵 (Hash Map) : 특정 키에 값을 연결할 때 사용, 해시 맵은 더 범용으로 사용되는 맵을 구현하는 구현체

```rust

```

### 8.1.4

러스트에서 벡터에 저장된 값을 참조하는 방법은 두 가지이다.

```rust

let v = vec![1,2,3,4,5];

1. let does_not_exist = &v[100];
2. let does_not_exsit = v.get(100);

```

1번 방식은 panic 이 발생한다.
이 방법은 벡터에 존재하지 않는 값에 접근할 때 프로그램이 충돌을 일으켜 강제 종료되기를 원할 때 유용하다.

2번 get 메서드에 벡터의 크기를 벗어나는 인덱스를 전달하는 방법은 패닉이 발생하지 않고 None 값이 리턴된다.
이 방법은 벡터의 범위를 벗어나는 인덱스의 값을 읽으려는 시도가 빈번하게 발생할 때 유용하다.

```rust
Error

let mut v = ved![1,2,3,4,5];
let first = &v[0];
v.push(6);

```

현재 벡터의 크기가 충분히 크지 않다면 벡터의 마지막에 새로운 값을 추가하기 이ㅜ해
새로운 메모리를 할당하고 이미 저장된 값들을 새로운 메모리 공간으로 옮겨야 할 수도 있기 때문
이때 first 변수에 저장된 참조는 메모리로부터 해제되며 대여 규칙상 프로그램은 이런 상황으로부터
보호되어야 하기 때문이다.

```rust

```

```rust

```

```rust

```

```rust

```

```rust

```

```rust

```

```rust

```

```rust

```
