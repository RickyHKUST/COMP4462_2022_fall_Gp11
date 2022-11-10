import java.io.FileReader;
import java.io.FileWriter;
import java.util.Scanner;

public class handler{

    public static void main(String[] args){
        try{
            int fileNumber = 3;
            FileReader myObj = new FileReader("./txt/p"+fileNumber+".txt");
            Scanner myReader = new Scanner(myObj);
            int counter = (fileNumber-1)*60000+0;
            String json = "{\n";
            while(myReader.hasNextLine()){
                String data = myReader.nextLine();
                data=data.replaceAll("<td>","");
                if(counter%3==0){
                    json+="\""+(counter/3+1)+"\":{\"Name of Building\":\""+data+"\"";
                }
                if(counter%3==1){
                    json+=",\"Address\":\""+data+"\"";
                }
                if(counter%3==2){
                    json+=",\"Incorporated Owners\":\""+data+"\"},\n";
                }
                counter++;
            }
            json+="}";
            System.out.println(json);
            FileWriter myWriter = new FileWriter("./json/p"+fileNumber+".json");
            myWriter.write(json);
            myWriter.close();
        }catch(Exception e){}
    }
}