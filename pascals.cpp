#include <iostream>
#include <iomanip>
using namespace std;

int pascals(int n, int k)
{
  if (k == 0 || k == n)
    return 1;
  return pascals(n - 1, k - 1) + pascals(n - 1, k);
}

int printPascals(int n)
{
  for (int i = 0; i < n; i++)
  {
    for (int j = 0; j <= i; j++){
      cout << setw(4) << pascals(i,j);
    }
    cout << endl;
  }
};

int main()
{
  int n;
  cin >> n;
  printPascals(n);
  return 0;
}