package P6;

public class P6Area {
	
	public static void main(String[] args) {
		
		double squareSide = 2.0 ;
		double recLength = 3.2 ;
		double recWidth = 4.0 ;
		double radius = 3.0 ;
		
		System.out.println("Area of sqaure with "+squareSide+": "+squareArea(squareSide));
		System.out.println("Area of a rectangle: "+ rectangleArea(recLength, recWidth)) ;
		System.out.println("Area of a circle: "+circleArea(radius));
		
	}
	
	public static double squareArea(double side) {
		return Math.pow(side,2) ;
	}
	
	public static double rectangleArea(double len, double width) {
		return len*width ;
	}
	
	public static double circleArea(double radius) {
		return Math.PI*Math.pow(radius,2) ;
	}

}
