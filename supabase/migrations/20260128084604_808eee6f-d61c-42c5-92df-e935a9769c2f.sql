-- Allow admins to manage products
CREATE POLICY "Admins can insert products"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update products"
ON public.products
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can delete products"
ON public.products
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Allow admins to manage shipments
CREATE POLICY "Admins can insert shipments"
ON public.shipments
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update shipments"
ON public.shipments
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can delete shipments"
ON public.shipments
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Allow admins to manage shipment events
CREATE POLICY "Admins can insert shipment events"
ON public.shipment_events
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update shipment events"
ON public.shipment_events
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can delete shipment events"
ON public.shipment_events
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Allow admins to view all orders and order items
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can view all order items"
ON public.order_items
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Allow admins to view all insurance applications
CREATE POLICY "Admins can update insurance applications"
ON public.insurance_applications
FOR UPDATE
TO authenticated
USING (public.is_admin());