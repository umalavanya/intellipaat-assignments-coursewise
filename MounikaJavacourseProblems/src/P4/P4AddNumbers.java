package P4;

import java.util.Scanner;

public class P4AddNumbers {
	
	public static void main(String[] args) {
		
		Scanner scanner = new Scanner(System.in) ;
		
		System.out.println("Mini Arithmatic calculator");
		
		printMenu() ;
		
		boolean isContinue = true ;
		
		System.out.println("Enter a number");
		double num1 = scanner.nextDouble() ;
		
		System.out.println("Enter operation");
		char operation = scanner.next().charAt(0) ;
		
		double result = 0 ;
		
		while(isContinue) {
			
			
		    System.out.println("Enter next number");
			double num2 = scanner.nextDouble() ;
			
			result = calculate(num1, operation, num2 ) ;
			
			System.out.println("\n==== r - result or  c - continue ====\n");
			char decision = scanner.next().charAt(0) ;
			
			if (decision == 'r') {
				isContinue = false ;
			} else {
				num1 = result ;
				System.out.println("Enter operation");
				operation = scanner.next().charAt(0) ;
				continue ;
			}
						
		}
		
		System.out.println(result);
		scanner.close();
		System.out.println("=========== End ============");
		
		
		
	}
	
	public static double calculate(double a, char operation, double b) {
		
		double result = 0 ;
		switch (operation) {
		
		case '+': {
			result = a+b ;
		    break ; 
			}
		
		case '-': {
			result = a-b ;
		    break ; 
			}
		
		case '*': {
			result = a*b ;
		    break ; 
			}
		
		case '/': {
			result = a/b ;
		    break ; 
			}
		
		case '%': {
			result = a%b ;
		    break ; 
			}
		
		default: 
			System.out.println("Invalid Operation");
	
		}
		
		return result ;
	}
	
	public static void printMenu() {
		StringBuilder sb = new StringBuilder() ;
		
		sb.append("====== The menu of the calculator =====").append("\n") ;
		
		sb.append("+ --- addition").append("\n") ;
		sb.append("- --- subtraction").append("\n") ;
		sb.append("* --- multiplication").append("\n") ;
		sb.append("/ --- division").append("\n") ;
		sb.append("% --- remainder").append("\n") ;
		
		System.out.println(sb.toString());
		
	}
	
	
	

}
