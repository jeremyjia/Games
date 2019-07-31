
class CBlApp {
public:
	void pbF1(HDC &hdc) { 
		::TextOut(hdc, 100, 100, TEXT("blApp v0.0.2"), 12);
		return ;
	}
};

