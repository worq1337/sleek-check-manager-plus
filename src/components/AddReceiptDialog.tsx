
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  serviceId: z.string().min(1, { message: "Service ID is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  operator: z.string().min(1, { message: "Operator is required" }),
  application: z.string().min(1, { message: "Application is required" }),
  amount: z.string().min(1, { message: "Amount is required" }).refine((val) => !isNaN(Number(val)), { 
    message: "Amount must be a number" 
  }),
  balance: z.string().min(1, { message: "Balance is required" }).refine((val) => !isNaN(Number(val)), { 
    message: "Balance must be a number" 
  }),
  pc: z.string().min(1, { message: "PC is required" }),
  p2p: z.enum(["Yes", "No"]),
});

type FormValues = z.infer<typeof formSchema>;

const AddReceiptDialog: React.FC = () => {
  const { activeTab, addReceipt } = useAppContext();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: "",
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].substring(0, 5),
      operator: "",
      application: activeTab === 'telegramBot' ? "Telegram Bot" : "SMS Service",
      amount: "",
      balance: "",
      pc: "",
      p2p: "No",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // Make sure all required fields are present and explicitly typed
    const newReceipt = {
      serviceId: data.serviceId,
      date: data.date,
      time: data.time,
      operator: data.operator,
      application: data.application,
      amount: Number(data.amount),
      balance: Number(data.balance),
      pc: data.pc,
      p2p: data.p2p
    };
    
    // Now pass the properly constructed object to addReceipt
    addReceipt(activeTab, newReceipt);
    
    toast({
      title: "Receipt added",
      description: "New receipt has been added successfully.",
    });
    
    form.reset();
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Добавить чек</DialogTitle>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Д.у</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите Д.у" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ПК</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите ПК" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дата</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Время</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="operator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Оператор/продавец</FormLabel>
                <FormControl>
                  <Input placeholder="Введите имя оператора или продавца" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="application"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Приложение</FormLabel>
                <FormControl>
                  <Input placeholder="Введите название приложения" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Сумма</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Остаток</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="p2p"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>p2p</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Да</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="No" />
                      </FormControl>
                      <FormLabel className="font-normal">Нет</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">Отмена</Button>
            </DialogClose>
            <Button type="submit">Сохранить</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AddReceiptDialog;
