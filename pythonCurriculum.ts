export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  testCases: { input: string; expected: string }[];
}

export interface Level {
  id: string;
  title: string;
  order: number;
  description: string;
  content: string;
  exercises: Exercise[];
  quizzes: Quiz[];
  unlocked: boolean;
}

export const pythonLevels: Level[] = [
  {
    id: "basics",
    title: "Python Basics",
    order: 1,
    description: "Learn the fundamentals of Python programming",
    unlocked: true,
    content: `# Welcome to Python Basics! 🐍

Python is a powerful, easy-to-learn programming language. Let's start with the basics!

## Variables and Data Types

In Python, you can store data in variables:

\`\`\`python
# Numbers
age = 25
price = 19.99

# Strings
name = "Alice"
message = 'Hello, World!'

# Booleans
is_student = True
has_passed = False
\`\`\`

## Print Function

The \`print()\` function displays output:

\`\`\`python
print("Hello, World!")
print("My age is:", age)
\`\`\`

## Basic Operations

Python supports arithmetic operations:

\`\`\`python
# Addition
result = 5 + 3  # 8

# Subtraction
result = 10 - 4  # 6

# Multiplication
result = 3 * 7  # 21

# Division
result = 15 / 3  # 5.0
\`\`\`

## Key Takeaways

- Variables store data
- Python has different data types (numbers, strings, booleans)
- Use print() to display output
- Basic math operations work as expected`,
    exercises: [
      {
        id: "basics-1",
        title: "Hello World",
        description: "Create a program that prints 'Hello, Python!' to the console.",
        starterCode: `# Write your code here\n`,
        solution: `print("Hello, Python!")`,
        testCases: [
          { input: "", expected: "Hello, Python!" }
        ]
      },
      {
        id: "basics-2",
        title: "Variables and Math",
        description: "Create two variables 'a' and 'b' with values 10 and 5, then print their sum.",
        starterCode: `# Create variables a and b\n# Print their sum\n`,
        solution: `a = 10\nb = 5\nprint(a + b)`,
        testCases: [
          { input: "", expected: "15" }
        ]
      }
    ],
    quizzes: [
      {
        question: "Which function is used to display output in Python?",
        options: ["echo()", "print()", "console.log()", "display()"],
        correctAnswer: 1
      },
      {
        question: "What is the result of 10 / 2 in Python 3?",
        options: ["5", "5.0", "2", "Error"],
        correctAnswer: 1
      },
      {
        question: "Which of these is a valid variable name?",
        options: ["2nd_var", "second-var", "second_var", "second var"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "control-flow",
    title: "Control Flow",
    order: 2,
    description: "Master if statements, loops, and conditional logic",
    unlocked: false,
    content: `# Control Flow in Python 🔀

Control flow determines the order in which code executes.

## If Statements

Make decisions in your code:

\`\`\`python
age = 18

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")
\`\`\`

## Elif (Else If)

Handle multiple conditions:

\`\`\`python
score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")
\`\`\`

## For Loops

Iterate over sequences:

\`\`\`python
# Loop through a range
for i in range(5):
    print(i)  # Prints 0, 1, 2, 3, 4

# Loop through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

## While Loops

Repeat while a condition is true:

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## Key Takeaways

- Use if/elif/else for conditional logic
- for loops iterate over sequences
- while loops repeat while a condition is true
- Indentation is crucial in Python!`,
    exercises: [
      {
        id: "control-1",
        title: "Even or Odd",
        description: "Write a program that checks if a number is even or odd. Print 'Even' or 'Odd'.",
        starterCode: `number = 7\n# Check if number is even or odd\n`,
        solution: `number = 7\nif number % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")`,
        testCases: [
          { input: "", expected: "Odd" }
        ]
      },
      {
        id: "control-2",
        title: "Count to Ten",
        description: "Use a for loop to print numbers from 1 to 10.",
        starterCode: `# Write a for loop here\n`,
        solution: `for i in range(1, 11):\n    print(i)`,
        testCases: [
          { input: "", expected: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10" }
        ]
      }
    ],
    quizzes: [
      {
        question: "What does the range(5) function return?",
        options: ["[1, 2, 3, 4, 5]", "[0, 1, 2, 3, 4]", "[0, 1, 2, 3, 4, 5]", "5"],
        correctAnswer: 1
      },
      {
        question: "How do you check if a number is even?",
        options: ["num % 2 == 0", "num / 2 == 0", "num % 2 == 1", "num.isEven()"],
        correctAnswer: 0
      }
    ]
  },
  {
    id: "functions",
    title: "Functions",
    order: 3,
    description: "Create reusable code blocks with functions",
    unlocked: false,
    content: `# Functions in Python ⚙️

Functions are reusable blocks of code that perform specific tasks.

## Defining Functions

Create a function using \`def\`:

\`\`\`python
def greet():
    print("Hello!")

# Call the function
greet()  # Output: Hello!
\`\`\`

## Parameters

Functions can accept inputs:

\`\`\`python
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Alice")  # Output: Hello, Alice!
\`\`\`

## Return Values

Functions can return values:

\`\`\`python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # Output: 8
\`\`\`

## Default Parameters

Provide default values:

\`\`\`python
def greet(name="Guest"):
    print(f"Hello, {name}!")

greet()  # Output: Hello, Guest!
greet("Bob")  # Output: Hello, Bob!
\`\`\`

## Key Takeaways

- Functions make code reusable
- Use \`def\` to define functions
- Parameters allow functions to accept inputs
- \`return\` sends values back to the caller`,
    exercises: [
      {
        id: "functions-1",
        title: "Square Function",
        description: "Create a function that returns the square of a number.",
        starterCode: `def square(num):\n    # Write your code here\n    pass\n\nprint(square(5))`,
        solution: `def square(num):\n    return num * num\n\nprint(square(5))`,
        testCases: [
          { input: "", expected: "25" }
        ]
      },
      {
        id: "functions-2",
        title: "Max of Two",
        description: "Create a function that returns the larger of two numbers.",
        starterCode: `def max_of_two(a, b):\n    # Write your code here\n    pass\n\nprint(max_of_two(10, 5))`,
        solution: `def max_of_two(a, b):\n    if a > b:\n        return a\n    else:\n        return b\n\nprint(max_of_two(10, 5))`,
        testCases: [
          { input: "", expected: "10" }
        ]
      }
    ],
    quizzes: [
      {
        question: "What keyword is used to define a function?",
        options: ["function", "def", "func", "define"],
        correctAnswer: 1
      },
      {
        question: "What does a function without a return statement return?",
        options: ["0", "null", "None", "undefined"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "lists",
    title: "Lists & Data Structures",
    order: 4,
    description: "Work with lists, tuples, and dictionaries",
    unlocked: false,
    content: `# Data Structures in Python 📦

Python provides powerful built-in data structures.

## Lists

Ordered, mutable collections:

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Access elements
print(fruits[0])  # apple

# Add elements
fruits.append("orange")

# Remove elements
fruits.remove("banana")

# Length
print(len(fruits))
\`\`\`

## List Methods

Common operations:

\`\`\`python
numbers = [3, 1, 4, 1, 5]

# Sort
numbers.sort()  # [1, 1, 3, 4, 5]

# Reverse
numbers.reverse()  # [5, 4, 3, 1, 1]

# Count occurrences
count = numbers.count(1)  # 2
\`\`\`

## Dictionaries

Key-value pairs:

\`\`\`python
student = {
    "name": "Alice",
    "age": 20,
    "grade": "A"
}

# Access values
print(student["name"])  # Alice

# Add/update
student["major"] = "Computer Science"
\`\`\`

## Key Takeaways

- Lists store ordered collections
- Dictionaries store key-value pairs
- Many built-in methods for manipulation
- Use indexing to access elements`,
    exercises: [
      {
        id: "lists-1",
        title: "Sum of List",
        description: "Create a function that returns the sum of all numbers in a list.",
        starterCode: `def sum_list(numbers):\n    # Write your code here\n    pass\n\nprint(sum_list([1, 2, 3, 4, 5]))`,
        solution: `def sum_list(numbers):\n    total = 0\n    for num in numbers:\n        total += num\n    return total\n\nprint(sum_list([1, 2, 3, 4, 5]))`,
        testCases: [
          { input: "", expected: "15" }
        ]
      }
    ],
    quizzes: [
      {
        question: "How do you access the first element of a list?",
        options: ["list.first()", "list[1]", "list[0]", "list.get(0)"],
        correctAnswer: 2
      },
      {
        question: "Which method adds an element to the end of a list?",
        options: ["add()", "push()", "append()", "insert()"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "classes",
    title: "Object-Oriented Programming",
    order: 5,
    description: "Learn classes, objects, and OOP concepts",
    unlocked: false,
    content: `# Object-Oriented Programming 🎯

OOP helps organize code using classes and objects.

## Classes

Define blueprints for objects:

\`\`\`python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def bark(self):
        return f"{self.name} says Woof!"

# Create an object
my_dog = Dog("Buddy", 3)
print(my_dog.bark())  # Buddy says Woof!
\`\`\`

## Methods

Functions inside classes:

\`\`\`python
class Circle:
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2
    
    def circumference(self):
        return 2 * 3.14 * self.radius
\`\`\`

## Inheritance

Create specialized classes:

\`\`\`python
class Animal:
    def speak(self):
        pass

class Cat(Animal):
    def speak(self):
        return "Meow!"

class Dog(Animal):
    def speak(self):
        return "Woof!"
\`\`\`

## Key Takeaways

- Classes define object templates
- __init__ is the constructor
- self refers to the instance
- Inheritance allows code reuse`,
    exercises: [
      {
        id: "classes-1",
        title: "Rectangle Class",
        description: "Create a Rectangle class with width, height, and an area() method.",
        starterCode: `class Rectangle:\n    # Define your class here\n    pass\n\nrect = Rectangle(5, 3)\nprint(rect.area())`,
        solution: `class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    \n    def area(self):\n        return self.width * self.height\n\nrect = Rectangle(5, 3)\nprint(rect.area())`,
        testCases: [
          { input: "", expected: "15" }
        ]
      }
    ],
    quizzes: [
      {
        question: "What is the purpose of __init__?",
        options: ["To delete objects", "To initialize objects", "To inherit classes", "To print objects"],
        correctAnswer: 1
      },
      {
        question: "What does 'self' represent in a class?",
        options: ["The class itself", "The parent class", "The instance", "A static variable"],
        correctAnswer: 2
      }
    ]
  }
];
