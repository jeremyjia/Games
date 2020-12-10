#include <iostream>
#include <cpprest/ws_client.h>

using namespace std;
using namespace web;
using namespace web::websockets::client;

int main() {
  cout << "cpp1.cpp_v0.12" << endl;  
  srand(time(NULL));
  char strUuid[256];
  sprintf(strUuid, "%x%x-%x-%x-%x-%x%x%x", 
    rand(), rand(),                 // Generates a 64-bit Hex number
    rand(),                         // Generates a 32-bit Hex number
    ((rand() & 0x0fff) | 0x4000),   // Generates a 32-bit Hex number of the form 4xxx (4 indicates the UUID version)
    rand() % 0x3fff + 0x8000,       // Generates a 32-bit Hex number in the range [0x8000, 0xbfff]
    rand(), rand(), rand());        // Generates a 96-bit Hex number

  cout << "strUuid =" << strUuid << endl;  
  
  websocket_client client;
  string wsURL = "ws://localhost:9090?userID=";
  wsURL +=strUuid;
  client.connect(wsURL).wait();

  websocket_outgoing_message out_msg;
  //{"method":"connect","clientId":"d560a361-7d08-41da-05c5-cd01b5f089d1"}
  string s = "{";
  s+="\"";
  s+="method";
  s+="\"";
  s+=":";
  s+="\"";
  s+="cppTest";
  s+="\"";
  s+="}";

  out_msg.set_utf8_message(s);
  client.send(out_msg).wait();

  client.receive().then([](websocket_incoming_message in_msg) {
    return in_msg.extract_string();
  }).then([](string body) {
    cout <<"xdtest:"<< body << endl; // test
  }).wait();

  client.close().wait();

  return 0;
}